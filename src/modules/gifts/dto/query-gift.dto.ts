import { IsOptional, IsInt, Min, IsIn } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class QueryGiftDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @Expose({ name: 'sort_by' })
  @IsIn(['updatedAt', 'rating'])
  sortBy: 'updatedAt' | 'rating' = 'updatedAt';

  @IsOptional()
  @Expose({ name: 'sort_order' })
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
