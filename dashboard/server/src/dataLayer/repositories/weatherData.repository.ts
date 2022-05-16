import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class WeatherDataRepository {
    constructor(
        @InjectModel(SchemaConstants.WeatherData)
        private readonly model: Model<WeatherData>
    ) {}

    async findAllAsync(): Promise<WeatherData[]> {
        return await this.model.find();
    }

    async findAllByGatewayIdAsync(gatewayId: string): Promise<WeatherData[]> {
        return await this.model.find({ gatewayId });
    }
}
