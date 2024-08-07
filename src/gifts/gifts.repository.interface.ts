import { Gift, Prisma } from "@prisma/client";
import { QueryGiftDto } from "./dto/query-gift.dto";

export interface GiftsRepository {
    // create(createGiftDto: CreateGiftDto): Promise<Gift>;
    selectAll(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.GiftWhereUniqueInput;
      where?: Prisma.GiftWhereInput;
      orderBy?: Prisma.GiftOrderByWithRelationInput;
    }): Promise<{items: Gift[], total: number}>;

    // selectOne(id: string): Promise<Gift>;
    // update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift>;
    // remove(id: string): void;
    // ... other methods
  }