import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArrayItemsService } from './array-items.service';
import { ArrayItemsController } from './array-items.controller';
import { ArrayItemsSchema } from './schemas/arrayItems.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ItemsArray', schema: ArrayItemsSchema },
    ]),
  ],
  controllers: [ArrayItemsController],
  providers: [ArrayItemsService],
  exports: [ArrayItemsService],
})
export class ArrayItemsModule {}
