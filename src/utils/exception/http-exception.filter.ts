import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDTO } from '../http/response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const data = (exception.getResponse() as any)?.message ?? 'Unknown error';
    // const data = exception.getResponse()

    this.logger.error(`${status} ${request.method} ${request.originalUrl}`);

    response.status(status).json(
      new ResponseDTO({
        success: false,
        message: exception.message,
        data: data,
      }),
    );
    // .json({
    //   data: exception.getResponse()?.message,
    //   message: exception.message
    // });
  }
}
