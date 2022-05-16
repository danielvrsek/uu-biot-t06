import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseConfig from 'dataLayer/configuration/keys';
import { AuthModule } from './modules/auth.module';
import { GatewayModule } from './modules/gateway.module';
import { UserModule } from './modules/user.module';
import { WeatherDataModule } from './modules/weatherData.module';
import { WorkspaceModule } from './modules/workspace.module';
import { CommandModule } from 'nestjs-command';
import { SeedCommand } from 'seed/seed.command';
import { SharedModule } from 'modules/shared.module';

@Module({
    imports: [
        MongooseModule.forRoot(MongooseConfig.mongoURI),
        SharedModule,
        AuthModule,
        UserModule,
        WeatherDataModule,
        WorkspaceModule,
        GatewayModule,
        CommandModule,
    ],
    providers: [SeedCommand],
})
export class AppModule {}
