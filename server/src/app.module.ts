import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { APP_GUARD } from '@nestjs/core';
import RolesGuard from './users/guards/roles.guard';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot(config.mongoURI),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, ItemsController, UsersController],
  providers: [AppService /* , { provide: APP_GUARD, useClass: RolesGuard } */],
})
export class AppModule {}
