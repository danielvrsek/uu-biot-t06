import { Test, TestingModule } from '@nestjs/testing';
import { ArrayItemsController } from './array-items.controller';
import { ArrayItemsService } from './array-items.service';

describe('ArrayItemsController', () => {
  let controller: ArrayItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArrayItemsController],
      providers: [ArrayItemsService],
    }).compile();

    controller = module.get<ArrayItemsController>(ArrayItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
