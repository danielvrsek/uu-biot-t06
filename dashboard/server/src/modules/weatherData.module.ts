import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherDataController } from 'controllers/weatherData.controller';
import { WeatherDataSchema } from 'dataLayer/schemas/weatherData.schema';
import { WeatherDataService } from 'services/weatherData.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'WeatherData', schema: WeatherDataSchema }])],
    controllers: [WeatherDataController],
    providers: [WeatherDataService],
    exports: [WeatherDataService],
})
export class WeatherDataModule {}
