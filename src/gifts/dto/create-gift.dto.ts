import { EnumBadge } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGiftDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  stock: number;

  @IsInt()
  price: number;

  @Expose({ name: 'review_count' })
  @IsInt()
  reviewCount: number;

  @IsString()
  image1: string;

  @IsOptional()
  @IsEnum(EnumBadge)
  badge?: EnumBadge;

  @IsNumberString()
  rating: number;
}
