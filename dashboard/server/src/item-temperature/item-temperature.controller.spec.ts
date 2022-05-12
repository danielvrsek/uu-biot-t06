import { Test, TestingModule } from '@nestjs/testing';
import { ItemTemperatureController } from './item-temperature.controller';
import { ItemTemperatureService } from './item-temperature.service';

describe('ItemTemperatureController', () => {
  let controller: ItemTemperatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTemperatureController],
      providers: [ItemTemperatureService],
    }).compile();

    controller = module.get<ItemTemperatureController>(ItemTemperatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
