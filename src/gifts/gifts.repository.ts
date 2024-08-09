import { Injectable } from '@nestjs/common';
import { GiftsRepository } from './gifts.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Gift, Prisma } from '@prisma/client';
import { CreateGiftDto } from './dto/create-gift.dto';

@Injectable()
export class GiftsRepositoryImpl implements GiftsRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGiftDto): Promise<Gift> {
    return await this.prisma.gift.create({
      data: {
        ...dto,
        rating: new Prisma.Decimal(dto.rating),
      },
    });
  }

  async selectAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GiftWhereUniqueInput;
    where?: Prisma.GiftWhereInput;
    orderBy?: Prisma.GiftOrderByWithRelationInput;
  }): Promise<{ items: Gift[]; total: number }> {
    const [items, count] = await Promise.all([
      this.prisma.gift.findMany({
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        where: params.where,
        orderBy: params.orderBy,
      }),
      this.prisma.gift.count({ where: params.where }),
    ]);

    return {
      items,
      total: count,
    };
  }

  async selectOne(id: string): Promise<Gift> {
    return await this.prisma.gift.findUniqueOrThrow({
      where: { uuid: id },
    });
  }

  // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>;
  // remove(id: string): void;
  // ... other methods
}
