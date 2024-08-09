import { Inject, Injectable } from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { Gift } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';
import { GiftsRepository } from './gifts.repository.interface';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class GiftsServiceImpl implements GiftsService {
  // private readonly logger = new Logger(GiftsServiceImpl.name);

  constructor(@Inject('GiftsRepository') private repo: GiftsRepository) {}

  create(dto: CreateGiftDto): Promise<Gift> {
    return this.repo.create(dto);
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

  partialUpdate(id: string, dto: UpdateGiftDto): Promise<Gift>{
    return this.repo.partialUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  async update(id: string, dto: CreateGiftDto): Promise<Gift> {
    // const entity = await this.repo.selectOne(id);
    return this.repo.update(id, dto);
  }
}
