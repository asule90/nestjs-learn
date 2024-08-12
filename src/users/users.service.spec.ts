import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaMock = {
  user: {
    findUniqueOrThrow: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    prismaMock.user.findUniqueOrThrow.mockClear();
    prismaMock.user.create.mockClear();
    prismaMock.user.findOne.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByUsername', () => {
    it('should return user if exists', async () => {
      const existingUser = {
        username: 'existing-user',
        name: 'Existing User',
      };

      prismaMock.user.findUniqueOrThrow.mockResolvedValue(existingUser);

      const result = await service.findOneByUsername(existingUser.username);
      expect(result).toEqual(existingUser);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { username: existingUser.username },
      });
    });

    it('should throw NotFoundException if user not exists', async () => {
      prismaMock.user.findUniqueOrThrow.mockRejectedValue(new NotFoundException());

      const usernameNotExists = 'non-existing-user';

      await expect(
        service.findOneByUsername(usernameNotExists),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { username: usernameNotExists },
      });
    });
  });

  describe('findOne', () => {
    it('should return user if exists', async () => {
      const existingUser = {
        username: 'existing-user',
        name: 'Existing User',
        id: '1',
      };

      prismaMock.user.findUniqueOrThrow.mockResolvedValue(existingUser);

      const result = await service.findOne(existingUser.id);
      expect(result).toEqual(existingUser);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
    });

    it('should throw NotFoundException if user not exists', async () => {
      prismaMock.user.findUniqueOrThrow.mockRejectedValue(new NotFoundException());

      const usernameNotExists = 'non-existing-user';

      await expect(
        service.findOne(usernameNotExists),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: usernameNotExists },
      });
    });
  });

  describe('create', () => {
    const dto = new CreateUserDto();
    dto.username = 'test';
    dto.password = 'test';
    dto.name = 'test';

    it('should return user if exists', async () => {
      const createdUser = {
        username: dto.username,
        name: dto.name,
        id: dto.name,
      };

      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await service.create(dto);

      expect(result).toEqual(createdUser);
      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          ...dto,
        },
      });
    });

    it('should throw Exception if user duplicate', async () => {
      const prismaError = new PrismaClientKnownRequestError('Error message', {
        code: 'P2002',
        clientVersion: '2.19.0',
        meta: { target: ['email'] }
      });

      prismaMock.user.create.mockRejectedValue(prismaError);

      expect(
        service.create(dto),
      ).rejects.toThrow(prismaError);

      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          ...dto,
        },
      });
    });
  });
});
