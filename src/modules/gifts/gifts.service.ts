import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GiftsService } from './gifts.service.interface';
import { Gift, GiftRates } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';
import { GiftsRepository } from './gifts.repository.interface';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { RatingGiftDto } from './dto/rating-gift.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppException } from 'src/utils/exception/app.exception';

@Injectable()
export class GiftsServiceImpl implements GiftsService {
  // private readonly logger = new Logger(GiftsServiceImpl.name);

  constructor(
    @Inject('GiftsRepository') private repo: GiftsRepository,
    private prisma: PrismaService
  ) {}

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
    const entity = dto.toEntity();
    return this.repo.partialUpdate(id, entity);
  }

  remove(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  update(id: string, dto: CreateGiftDto): Promise<Gift> {
    // const entity = await this.repo.selectOne(id);
    return this.repo.update(id, dto);
  }

  async redeem(id: string, qty: number): Promise<Gift> {
    const entity = await this.repo.selectOne(id);
    if (entity.stock < qty ) {
      throw new UnprocessableEntityException('gift stock is less than requested');
    }

    entity.stock -= qty;
    const partialEntity: Partial<Gift> = entity;
    return this.repo.partialUpdate(id, partialEntity);
  }

  async rate(id: string, dto: RatingGiftDto, userID: string): Promise<Gift> {
    let entity: Gift;
    try {
      entity = await this.repo.selectOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Gift was not found');
      }

      throw error;
    }

    return this.prisma.$transaction(async (prisma) => {
      try {
        await this.repo.insertRate(entity.uuid, dto, userID, prisma);
        
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('user was not found');
        }
  
        throw error;
      }
  
      //calculate rating
      entity.reviewCount++;
  
      const ratings = await this.repo.selectAllRating(entity.uuid, prisma);
      const averageRate = this.calculateAverageRate(ratings);
      const roundedRate = Math.round(averageRate * 2) / 2
      const averageRateDecimal = new Decimal(roundedRate);
      
      entity.rating = averageRateDecimal;
  
      const partialEntity: Partial<Gift> = entity;
      entity = await this.repo.partialUpdate(id, partialEntity, prisma);
  
      return entity;

    });
  }

  private calculateAverageRate(items: GiftRates[]): number {
    if (items.length === 0) {
      return 0; // Avoid division by zero
    }
  
    const totalRate = items.reduce((sum, item) => sum + item.rating, 0);
    const averageRate = totalRate / items.length;
    
    return averageRate;
  }
}
