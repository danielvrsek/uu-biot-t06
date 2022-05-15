import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import WeatherData from 'dataLayer/entities/weatherData.entity';

@Injectable()
export class WeatherDataRepository {
    constructor(
        @InjectModel('WeatherData')
        private readonly model: Model<WeatherData>
    ) {}

    async findAll(): Promise<WeatherData[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<WeatherData> {
        return await this.model.findOne({ _id: id });
    }
}
