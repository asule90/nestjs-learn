import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthServiceImpl } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const prismaMock = {
  user: {
    findUniqueOrThrow: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  verifyAsync: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        {
          provide: 'AuthService',
          useClass: AuthServiceImpl,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
