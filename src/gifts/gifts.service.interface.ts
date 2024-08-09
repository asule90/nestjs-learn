import { Gift } from '@prisma/client';
import { QueryGiftDto } from './dto/query-gift.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

export interface GiftsService {
  create(dto: CreateGiftDto): Promise<Gift>;
  findAll(query: QueryGiftDto): Promise<{ items: Gift[]; total: number }>;
  findOne(id: string): Promise<Gift>;
  partialUpdate(id: string, dto: UpdateGiftDto): Promise<Gift>;
  update(id: string, dto: CreateGiftDto): Promise<Gift>;
  remove(id: string): Promise<void>;
  redeem(id: string, qty: number): Promise<Gift>;
}
