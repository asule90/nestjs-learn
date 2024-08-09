import { Gift, Prisma } from '@prisma/client';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

export interface GiftsRepository {
  create(dto: CreateGiftDto): Promise<Gift>;

  selectAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GiftWhereUniqueInput;
    where?: Prisma.GiftWhereInput;
    orderBy?: Prisma.GiftOrderByWithRelationInput;
  }): Promise<{ items: Gift[]; total: number }>;

  selectOne(id: string): Promise<Gift>;

  partialUpdate(id: string, dto: UpdateGiftDto): Promise<Gift>;
  
  delete(id: string): Promise<void>;

  update(id: string, dto: CreateGiftDto): Promise<Gift>;
}
