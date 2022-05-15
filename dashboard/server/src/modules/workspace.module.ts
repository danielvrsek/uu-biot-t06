import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherDataController } from 'controllers/weatherData.controller';
import { WorkspaceSchema } from 'dataLayer/schemas/workspace.schema';
import { WeatherDataService } from 'services/weatherData.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Workspace', schema: WorkspaceSchema }])],
    controllers: [WeatherDataController],
    providers: [WeatherDataService],
    exports: [WeatherDataService],
})
export class WeatherDataModule {}
