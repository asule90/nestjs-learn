import { Injectable, NotFoundException } from '@nestjs/common';
import { GiftsRepository } from './gifts.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Gift, Prisma } from '@prisma/client';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { RatingGiftDto } from './dto/rating-gift.dto';
// import { AppException } from 'src/utils/exception/app.exception';

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
    try {
      return await this.prisma.gift.findUniqueOrThrow({
        where: { uuid: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async partialUpdate(id: string, entity: Partial<Gift>): Promise<Gift>{
    try {
      return await this.prisma.gift.update({
        where: { uuid: id },
        data: {
          ...entity,
          rating: entity.rating ? new Prisma.Decimal(entity.rating) : undefined,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.gift.delete({
        where: { uuid: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }
  
  async update(id: string, dto: CreateGiftDto): Promise<Gift> {
    try {
      return await this.prisma.gift.update({
        where: { uuid: id },
        data: {
          ...dto,
          rating: new Prisma.Decimal(dto.rating),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async insertRate(id: string, dto: RatingGiftDto, userId: string): Promise<void> {
    try {
      await this.prisma.giftRates.create({
        data: {
          ...dto,
          gift: {
            connect: {
              uuid: id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }
}
