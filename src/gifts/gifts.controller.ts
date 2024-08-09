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
  UnprocessableEntityException,
  HttpCode,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { QueryGiftDto } from './dto/query-gift.dto';
import {
  ErrorResponseDTO,
  PagingResponseDTO,
  SuccessResponseDTO,
} from 'utils/http/response.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { RedeemGiftDto } from './dto/redeem-gift.dto';
import { RatingGiftDto } from './dto/rating-gift.dto';
import { AuthGuard } from 'src/auth/auth.guard';


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

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    try {
      const entity = await this.service.partialUpdate(id, updateGiftDto);

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

  @Put(':id')
  async put(@Param('id') id: string, @Body() dto: CreateGiftDto) {
    try {
      const entity = await this.service.update(id, dto);

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

  @Post(':id/redeem')
  @HttpCode(200)
  async redeem(@Param('id') id: string, @Body() dto: RedeemGiftDto) {
    try {
      const entity = await this.service.redeem(id, dto.qty);

      return new SuccessResponseDTO({
        message: 'success redeemed '+dto.qty+' gift',
        data: entity,
      });
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new HttpException({
          message: error.message,
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      if (error instanceof NotFoundException) {
        throw new HttpException({
          message: 'Gift was not found',
        }, HttpStatus.NOT_FOUND);
      }
      
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id/rating')
  @HttpCode(200)
  async rating(@Request() req: Request, @Param('id') id: string, @Body() dto: RatingGiftDto) {
    try {
      const user: any = (req as any).user;
      const entity = await this.service.rate(id, dto, user.sub);

      return new SuccessResponseDTO({
        message: 'success',
        data: entity,
      });
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new HttpException({
          message: error.message,
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      if (error instanceof NotFoundException) {
        throw new HttpException({
          message: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      
      throw error;
    }
  }

}
