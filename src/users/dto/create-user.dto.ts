import {
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
