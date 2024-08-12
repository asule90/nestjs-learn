import { Test, TestingModule } from '@nestjs/testing';
import { GiftsServiceImpl } from './gifts.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockRepo = {
  findOne: jest.fn(),
  findOneByUsername: jest.fn(),
  create: jest.fn(),
};

const prismaMock = {
  user: {
    findUniqueOrThrow: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
};


describe('GiftsService', () => {
  let service: GiftsServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftsServiceImpl,
        {
          provide: 'GiftsRepository',
          useValue: mockRepo,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        }
      ],
    }).compile();

    service = module.get<GiftsServiceImpl>(GiftsServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
