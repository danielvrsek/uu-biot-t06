import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArrayItemsService } from './array-items.service';
import { ArrayItemsController } from './array-items.controller';
import { ArrayItemsSchema } from 'src/schemas/arrayItems.schema';
import { ItemHumiditySchema } from 'src/schemas/itemHumidity.schema';
import { ItemTemperatureSchema } from 'src/schemas/itemTemperature.schema';
import { ItemsModule } from 'src/items/items.module';
import { ItemHumidityModule } from 'src/item-humidity/item-humidity.module';
import { ItemTemperatureModule } from 'src/item-temperature/item-temperature.module';

@Module({
  imports: [
    ItemsModule,
    ItemHumidityModule,
    ItemTemperatureModule,
    MongooseModule.forFeature([
      { name: 'ItemsArray', schema: ArrayItemsSchema },
      { name: 'ItemHumidity', schema: ItemHumiditySchema },
      { name: 'ItemTemperature', schema: ItemTemperatureSchema },
    ]),
  ],
  controllers: [ArrayItemsController],
  providers: [ArrayItemsService],
  exports: [ArrayItemsService],
})
export class ArrayItemsModule {}
