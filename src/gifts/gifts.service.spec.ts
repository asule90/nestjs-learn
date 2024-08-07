import { Test, TestingModule } from '@nestjs/testing';
import { GiftsServiceImpl } from './gifts.service';

describe('GiftsService', () => {
  let service: GiftsServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftsServiceImpl],
    }).compile();

    service = module.get<GiftsServiceImpl>(GiftsServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
