import { Module } from '@nestjs/common';
import { ItemHumidityService } from './item-humidity.service';
import { ItemHumidityController } from './item-humidity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemHumiditySchema } from 'src/schemas/itemHumidity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ItemHumidity', schema: ItemHumiditySchema },
    ]),
  ],
  controllers: [ItemHumidityController],
  providers: [ItemHumidityService],
  exports: [ItemHumidityService],
})
export class ItemHumidityModule {}
