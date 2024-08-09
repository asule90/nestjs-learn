import { EnumBadge } from '@prisma/client';
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

  @IsString()
  @Expose({ name: 'image_1' })
  image1: string;

  @IsOptional()
  @IsEnum(EnumBadge)
  badge?: EnumBadge;
}
