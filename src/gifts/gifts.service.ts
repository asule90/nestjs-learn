import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftsService } from './gifts.service.interface';
import { Gift } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';
import { GiftsRepository } from './gifts.repository.interface';

@Injectable()
export class GiftsServiceImpl implements GiftsService{
  private readonly logger = new Logger(GiftsServiceImpl.name);

  constructor(@Inject('GiftsRepository') private repo: GiftsRepository) {}

  // create(createGiftDto: CreateGiftDto): Promise<Gift>{
  //   return 'This action adds a new gift';
  // }

  async findAll(query: QueryGiftDto): Promise<{items: Gift[], total: number}>{
    const skip = (query.page - 1) * query.limit;
    
    let orderBy: any = {};
    orderBy[query.sortBy] = query.sortOrder;

    return this.repo.selectAll({
      skip,
      take: query.limit,
      orderBy,
    });
  }

  // findOne(id: string): Promise<Gift>{
  //   return this.prisma.user.findUnique({
  //     where: userWhereUniqueInput,
  //   });
  // }

  // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>{
  //   return `This action updates a #${id} gift`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} gift`;
  // }
}
