import { Test, TestingModule } from '@nestjs/testing';
import { ArrayItemsService } from './array-items.service';

describe('ArrayItemsService', () => {
  let service: ArrayItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrayItemsService],
    }).compile();

    service = module.get<ArrayItemsService>(ArrayItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
