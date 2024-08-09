import { Inject, Injectable } from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { Gift } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';
import { GiftsRepository } from './gifts.repository.interface';
import { CreateGiftDto } from './dto/create-gift.dto';

@Injectable()
export class GiftsServiceImpl implements GiftsService {
  // private readonly logger = new Logger(GiftsServiceImpl.name);

  constructor(@Inject('GiftsRepository') private repo: GiftsRepository) {}

  create(createGiftDto: CreateGiftDto): Promise<Gift> {
    return this.repo.create(createGiftDto);
  }

  findAll(query: QueryGiftDto): Promise<{ items: Gift[]; total: number }> {
    const skip = (query.page - 1) * query.limit;

    const orderBy: any = {};
    orderBy[query.sortBy] = query.sortOrder;

    return this.repo.selectAll({
      skip,
      take: query.limit,
      orderBy,
    });
  }

  findOne(id: string): Promise<Gift> {
    return this.repo.selectOne(id);
  }

  // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>{
  //   return `This action updates a #${id} gift`;
  // }

  remove(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
