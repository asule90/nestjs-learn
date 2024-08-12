import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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