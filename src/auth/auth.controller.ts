import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Logger, NotFoundException, Post, UnprocessableEntityException } from '@nestjs/common';
import { UserLoginDto } from './dto/login-user.dto';
import { AuthService } from './auth.service.interface';
import { SuccessResponseDTO } from 'utils/http/response.dto';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    @Inject('AuthService') private readonly service: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() dto: UserLoginDto) {
    try {
      const data = await this.service.signIn(dto.username, dto.password);
      return new SuccessResponseDTO({
        message: 'login success',
        data: data
      });
    } catch (error) {
      const knownError = error instanceof NotFoundException || error instanceof UnprocessableEntityException;

      if (knownError) {
        throw new HttpException({
          message: 'user or password doesn\'t match',
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      throw error;
    }
  }
}