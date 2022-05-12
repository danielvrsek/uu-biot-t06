import { Module } from '@nestjs/common';
import { ItemTemperatureService } from './item-temperature.service';
import { ItemTemperatureController } from './item-temperature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemTemperatureSchema } from 'src/schemas/itemTemperature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ItemTemperature', schema: ItemTemperatureSchema },
    ]),
  ],
  controllers: [ItemTemperatureController],
  providers: [ItemTemperatureService],
  exports: [ItemTemperatureService],
})
export class ItemTemperatureModule {}
