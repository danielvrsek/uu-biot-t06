import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArrayItemsModule } from './array-items/array-items.module';
import { ArrayItemsController } from './array-items/array-items.controller';
import { ItemTemperatureModule } from './item-temperature/item-temperature.module';
import { ItemHumidityModule } from './item-humidity/item-humidity.module';
import { ItemTemperatureController } from './item-temperature/item-temperature.controller';
import { ItemHumidityController } from './item-humidity/item-humidity.controller';
import config from './config/keys';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot(config.mongoURI),
    UsersModule,
    AuthModule,
    ArrayItemsModule,
    ItemTemperatureModule,
    ItemHumidityModule,
  ],
  controllers: [
    AppController,
    ItemsController,
    UsersController,
    ArrayItemsController,
    ItemHumidityController,
    ItemTemperatureController,
  ],
  providers: [AppService /* , { provide: APP_GUARD, useClass: RolesGuard } */],
})
export class AppModule {}
