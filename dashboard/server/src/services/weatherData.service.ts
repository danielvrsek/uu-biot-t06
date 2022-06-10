import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { InsertWeatherDataDto } from './dto/weatherData.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class WeatherDataService {
    constructor(@InjectModel(SchemaConstants.WeatherData) private readonly model: Model<WeatherData>) {}

    async insertAsync(gatewayId: Types.ObjectId, dto: InsertWeatherDataDto): Promise<number> {
        const length = dto.data.length;
        await this.model.insertMany(
            dto.data.map((data) => new this.model({ gatewayId: objectId(gatewayId), ...data }))
        );

        return length;
    }

    async deleteAsync(id: Types.ObjectId): Promise<WeatherData> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: Types.ObjectId, item: WeatherData): Promise<WeatherData> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }

    calculateGranularity(data: WeatherData[], dateFrom: Date, dateTo: Date, granularitySeconds: number): WeatherData[] {
        /*const numberOfItems = dateFrom. - dateTo

        const result: WeatherData[] = dateFrom - dateTo;

        for (const item of data) {
        }*/

        return data;
    }
}
