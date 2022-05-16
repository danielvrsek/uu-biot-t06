import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherDataController } from 'controllers/weatherData.controller';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WeatherDataSchema } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { WeatherDataService } from 'services/weatherData.service';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SchemaConstants.WeatherData, schema: WeatherDataSchema }]),
        SharedModule,
    ],
    controllers: [WeatherDataController],
    providers: [WeatherDataService, WeatherDataRepository],
})
export class WeatherDataModule {}
