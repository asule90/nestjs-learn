import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDTO } from '../http/response.dto';
// import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = 'Internal server error';
    let errorDetails = null;

    if (exception instanceof HttpException) {
      errorMessage = exception.message;
      errorDetails = (exception.getResponse() as any)?.message || null;
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
      errorDetails = exception.stack;
    }

    this.logger.error(`${httpStatus} ${request.method} ${request.originalUrl}`);
    this.logger.error(errorDetails);

    response.status(httpStatus).json(
      new ResponseDTO({
        success: false,
        message: errorMessage,
        data: errorDetails,
      }),
    );
    // .json({
    //   data: exception.getResponse()?.message,
    //   message: exception.message
    // });
  }
}
