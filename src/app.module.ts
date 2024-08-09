import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GiftsModule } from './gifts/gifts.module';
import { LoggerMiddleware } from '../utils/http/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }), AuthModule, GiftsModule, PrismaModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
