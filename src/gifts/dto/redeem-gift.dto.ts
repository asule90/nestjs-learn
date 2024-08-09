import {
  IsInt,
  IsPositive,
} from 'class-validator';

export class RedeemGiftDto {
  @IsInt()
  @IsPositive()
  qty: number;
}
