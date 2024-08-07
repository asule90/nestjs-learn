import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(statusCode: HttpStatus, message: string) {
    super(message, statusCode);
  }
}
