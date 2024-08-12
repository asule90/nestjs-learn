import { Gift, GiftRates, Prisma } from '@prisma/client';
import { CreateGiftDto } from './dto/create-gift.dto';
import { RatingGiftDto } from './dto/rating-gift.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  partialUpdate(id: string, entity: Partial<Gift>, prismaClient?: Prisma.TransactionClient | PrismaService): Promise<Gift>;
  
  delete(id: string): Promise<void>;

  update(id: string, dto: CreateGiftDto): Promise<Gift>;

  insertRate(id: string, dto: RatingGiftDto, userId: string, prismaClient?: Prisma.TransactionClient | PrismaService): Promise<void>;

  selectAllRating(id: string, prismaClient?: Prisma.TransactionClient | PrismaService): Promise<GiftRates[]>;
}
