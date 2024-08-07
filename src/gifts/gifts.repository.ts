import { Injectable } from '@nestjs/common';
import { GiftsRepository } from './gifts.repository.interface';
import { PrismaService } from 'src/prisma.service';
import { Gift, Prisma } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';

@Injectable()
export class GiftsRepositoryImpl implements GiftsRepository{
    constructor(private prisma: PrismaService) {}

    // create(createGiftDto: CreateGiftDto): Promise<Gift>;
    async selectAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GiftWhereUniqueInput;
        where?: Prisma.GiftWhereInput;
        orderBy?: Prisma.GiftOrderByWithRelationInput;
      }): Promise<{items: Gift[], total: number}>{
    
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

    // selectOne(id: string): Promise<Gift> {

    // }
    // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>;
    // remove(id: string): void;
    // ... other methods
}
