import { Test, TestingModule } from '@nestjs/testing';
import { ItemTemperatureService } from './item-temperature.service';

describe('ItemTemperatureService', () => {
  let service: ItemTemperatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemTemperatureService],
    }).compile();

    service = module.get<ItemTemperatureService>(ItemTemperatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
