import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessResponseDTO } from 'src/utils/http/response.dto';
import { hash } from '../../utils/Security';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}


  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      dto.password = await hash(dto.password);

      const entity = await this.service.create(dto);

      return new SuccessResponseDTO({
        message: 'success creating user data',
        data: entity,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException({
          message: 'username or email is not available',
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      
      throw error;
    }
  }
}
