import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  NotFoundException,
  Patch,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { QueryGiftDto } from './dto/query-gift.dto';
import {
  ErrorResponseDTO,
  PagingResponseDTO,
  SuccessResponseDTO,
} from 'src/utils/http/response.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { AppException } from 'src/utils/exception/app.exception';


@Controller('gifts')
export class GiftsController {
  private readonly logger = new Logger(GiftsController.name);

  constructor(@Inject('GiftsService') private readonly service: GiftsService) {}

  @Post()
  async create(@Body() dto: CreateGiftDto) {
    try {
      const entity = await this.service.create(dto);

      return new SuccessResponseDTO({
        message: 'success creating gift data',
        data: entity,
      });
    } catch (error) {
      if (error instanceof AppException) {
        return new ErrorResponseDTO({
          message: error.message,
        });
      }
      
      throw error;
    }
  }

  @Get()
  async findAll(@Query() query: QueryGiftDto) {
    try {
      const { items, total } = await this.service.findAll(query);

      const paging: PagingResponseDTO = {
        currentPage: query.page,
        totalPages: Math.ceil(total / query.limit),
        pageSize: query.limit,
        totalCount: total,
      };

      return new SuccessResponseDTO({
        message: 'success fetching gift data',
        data: items,
        paging: paging,
      });
    } catch (error) {
      if (error instanceof AppException) {
        return new ErrorResponseDTO({
          message: error.message,
        });
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service.findOne(id);
      return new SuccessResponseDTO({
        message: 'success fetching gift data',
        data: data
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          message: 'Gift was not found',
        }, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
  //   return this.giftsService.update(id, updateGiftDto);
  // }

  @Put(':id')
  async put(@Param('id') id: string, @Body() dto: CreateGiftDto) {
    try {
      const entity = await this.service.put(id, dto);

      return new SuccessResponseDTO({
        message: 'success updating gift data',
        data: entity,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          message: 'Gift was not found',
        }, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    try {
      await this.service.remove(id);

      return new SuccessResponseDTO({
        message: 'success deleting gift data',
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          message: 'Gift was not found',
        }, HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
