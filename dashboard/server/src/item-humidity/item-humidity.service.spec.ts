import { Test, TestingModule } from '@nestjs/testing';
import { ItemHumidityService } from './item-humidity.service';

describe('ItemHumidityService', () => {
  let service: ItemHumidityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemHumidityService],
    }).compile();

    service = module.get<ItemHumidityService>(ItemHumidityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
