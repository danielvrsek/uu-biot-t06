import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'controllers/auth.controller';
import { UserController } from 'controllers/user.controller';
import { WeatherDataController } from 'controllers/weatherData.controller';
import { WorkspaceController } from 'controllers/workspace.controller';
import MongooseConfig from 'dataLayer/configuration/keys';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { WeatherDataModule } from './weatherData.module';

@Module({
    imports: [MongooseModule.forRoot(MongooseConfig.mongoURI), AuthModule, UsersModule, WeatherDataModule],
    controllers: [AuthController, UserController, WeatherDataController, WorkspaceController],
    providers: [],
})
export class AppModule {}
