import { Test, TestingModule } from '@nestjs/testing';
import { GiftsController } from './gifts.controller';
import { GiftsServiceImpl } from './gifts.service';
import { GiftsRepositoryImpl } from './gifts.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

const mockConfigService = {
  get: jest.fn(),
};

describe('GiftsController', () => {
  let controller: GiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftsController],
      providers: [
        {
          provide: 'GiftsService',
          useClass: GiftsServiceImpl,
        },
        {
          provide: 'GiftsRepository',
          useClass: GiftsRepositoryImpl,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<GiftsController>(GiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
