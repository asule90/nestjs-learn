import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service.interface';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthServiceImpl implements AuthService {
  private readonly logger: Logger = new Logger(AuthServiceImpl.name)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    const isMatch = await bcrypt.compare(pass, user?.password);
    if ( !isMatch ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.id, username: user?.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}