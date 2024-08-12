import { Module } from '@nestjs/common';
import { GiftsServiceImpl } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { GiftsRepositoryImpl } from './gifts.repository';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
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
