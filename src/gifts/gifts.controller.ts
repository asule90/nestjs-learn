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
  Res,
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
import { Response } from 'express';

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
      } else {
        throw error;
      }
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
      } else {
        throw error;
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.service.findOne(id);
      return res.status(200).json(new SuccessResponseDTO({
        message: 'success fetching gift data',
        data: data,
      }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json(new ErrorResponseDTO({
          message: 'Gift was not found',
        }));
      }
      throw error;
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
  //   return this.giftsService.update(id, updateGiftDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {

    try {
      await this.service.remove(id);

      return res.status(200).json(new SuccessResponseDTO({
        message: 'success deleting gift data',
      }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json(new ErrorResponseDTO({
          message: 'Gift was not found',
        }));
      }

      throw error;
    }
  }
}
