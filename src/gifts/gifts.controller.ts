import { Controller, Get, Query, Inject, Post, Body, Param } from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { QueryGiftDto } from './dto/query-gift.dto';
import {
  ErrorResponseDTO,
  PagingResponseDTO,
  ResponseDTO,
  SuccessResponseDTO,
} from 'src/utils/http/response.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { AppException } from 'src/utils/exception/app.exception';

@Controller('gifts')
export class GiftsController {
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
  async findOne(@Param('id') id: string) {
    try {
      return new SuccessResponseDTO({
        message: 'success fetching gift data',
        data: await this.service.findOne(id)
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
  //   return this.giftsService.update(id, updateGiftDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.giftsService.remove(id);
  // }
}
