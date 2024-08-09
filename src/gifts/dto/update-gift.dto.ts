import { PartialType } from '@nestjs/mapped-types';
import { CreateGiftDto } from './create-gift.dto';
import { Gift, Prisma } from '@prisma/client';

export class UpdateGiftDto extends PartialType(CreateGiftDto) {

  toEntity(): Partial<Gift> {
    return {
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      reviewCount: this.reviewCount,
      image1: this.image1,
      badge: this.badge,
      rating: this.rating ? new Prisma.Decimal(this.rating) : undefined,
    };
  }
}
