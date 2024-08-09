import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './utils/exception/all-exception.filter';
import { SnakeCaseInterceptor } from './utils/http/SnakeCaseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new SnakeCaseInterceptor());

  await app.listen(3000);
}
bootstrap();
