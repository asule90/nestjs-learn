import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';


export interface AuthService {
  signIn(username: string, pass: string): Promise<any>;
}