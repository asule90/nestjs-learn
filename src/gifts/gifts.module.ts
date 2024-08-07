import { Module } from '@nestjs/common';
import { GiftsServiceImpl } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { GiftsRepositoryImpl } from './gifts.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GiftsController],
  providers: [{
    provide: 'GiftsService',
    useClass: GiftsServiceImpl
  },
  {
    provide: 'GiftsRepository',
    useClass: GiftsRepositoryImpl
  }],
})
export class GiftsModule {}
