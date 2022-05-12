import { Test, TestingModule } from '@nestjs/testing';
import { ItemHumidityController } from './item-humidity.controller';
import { ItemHumidityService } from './item-humidity.service';

describe('ItemHumidityController', () => {
  let controller: ItemHumidityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemHumidityController],
      providers: [ItemHumidityService],
    }).compile();

    controller = module.get<ItemHumidityController>(ItemHumidityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
