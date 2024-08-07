import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject, Logger } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftsService } from './gifts.service.interface';
import { QueryGiftDto } from './dto/query-gift.dto';
import { PagingResponseDTO, ResponseDTO } from 'src/utils/http/response.dto';

@Controller('gifts')
export class GiftsController {

  constructor(@Inject('GiftsService') private readonly service: GiftsService) {}
  // constructor(@Inject('IGiftsService') private giftsService: IGiftsService) {}

  // @Post()
  // create(@Body() createGiftDto: CreateGiftDto) {
  //   return this.giftsService.create(createGiftDto);
  // }

  @Get()
  async findAll(@Query() query: QueryGiftDto) {

    const {items, total} = await this.service.findAll(query);

    const paging: PagingResponseDTO = {
      currentPage: query.page,
      totalPages: Math.ceil(total / query.limit),
      pageSize: query.limit,
      totalCount: total,
    };

    return new ResponseDTO({
      success: true,
      message: 'success fetching gift data',
      data: items,
      paging: paging,
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.giftsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
  //   return this.giftsService.update(id, updateGiftDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.giftsService.remove(id);
  // }
}
