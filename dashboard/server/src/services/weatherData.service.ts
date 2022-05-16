import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { InsertWeatherDataDto } from './dto/weatherData.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class WeatherDataService {
    constructor(@InjectModel(SchemaConstants.WeatherData) private readonly model: Model<WeatherData>) {}

    async insertAsync(gatewayId: string, dto: InsertWeatherDataDto): Promise<number> {
        const length = dto.data.length;
        await this.model.insertMany(dto.data.map((data) => new this.model({ gatewayId, ...data })));

        return length;
    }

    async deleteAsync(id: string): Promise<WeatherData> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: string, item: WeatherData): Promise<WeatherData> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }
}
