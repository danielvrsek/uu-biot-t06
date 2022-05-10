import { Module } from '@nestjs/common';
import { ArrayItemsService } from './array-items.service';
import { ArrayItemsController } from './array-items.controller';

@Module({
  controllers: [ArrayItemsController],
  providers: [ArrayItemsService]
})
export class ArrayItemsModule {}
