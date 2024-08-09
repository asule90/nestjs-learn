import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  async findOne(id: string): Promise<User | undefined> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { username: username },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async create(dto: CreateUserDto): Promise<User | undefined> {
    return await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
  }
}