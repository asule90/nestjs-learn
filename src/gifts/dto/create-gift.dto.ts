import { EnumBadge, Gift, Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateGiftDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsInt()
  @IsPositive()
  price: number;

  @Expose({ name: 'review_count' })
  @IsInt()
  @IsPositive()
  reviewCount: number;

  @IsString()
  @Expose({ name: 'image_1' })
  image1: string;

  @IsOptional()
  @IsEnum(EnumBadge)
  badge?: EnumBadge;

  @IsNumberString()
  @IsDecimal({force_decimal: true})
  rating: number;

}
