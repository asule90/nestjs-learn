import { Module } from '@nestjs/common';
import { GiftsServiceImpl } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { GiftsRepositoryImpl } from './gifts.repository';

@Module({
  controllers: [GiftsController],
  providers: [
    {
      provide: 'GiftsService',
      useClass: GiftsServiceImpl,
    },
    {
      provide: 'GiftsRepository',
      useClass: GiftsRepositoryImpl,
    },
  ],
})
export class GiftsModule {}
