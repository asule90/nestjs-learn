import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceImpl } from './auth.service'; // Import the implementation
import { AuthService } from './auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

const mockJwtService = {
  verifyAsync: jest.fn(),
};
const mockUserService = {
  findOne: jest.fn(),
  findOneByUsername: jest.fn(),
  create: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'AuthService',
          useClass: AuthServiceImpl,
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>('AuthService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
