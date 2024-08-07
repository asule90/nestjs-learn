import { Gift } from "@prisma/client";
import { CreateGiftDto } from "./dto/create-gift.dto";
import { UpdateGiftDto } from './dto/update-gift.dto';
import { QueryGiftDto } from "./dto/query-gift.dto";

export interface GiftsService {
    // create(createGiftDto: CreateGiftDto): Promise<Gift>;
    findAll(query: QueryGiftDto): Promise<{items: Gift[], total: number}>;
    // findOne(id: string): Promise<Gift>;
    // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>;
    // remove(id: string): void;
    // ... other methods
  }