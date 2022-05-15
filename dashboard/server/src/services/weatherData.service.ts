import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import WeatherData from 'dataLayer/entities/weatherData.entity';
import { CreateWeatherDataDto } from './dto/weatherData.dto';

@Injectable()
export class WeatherDataService {
    constructor(
        @InjectModel('WeatherData')
        private readonly model: Model<WeatherData>
    ) {}

    async create(item: CreateWeatherDataDto): Promise<WeatherData> {
        // TODO: authenticate gateway and add timestamp
        const newItem = new this.model(item);
        return await newItem.save();
    }

    async delete(id: string): Promise<WeatherData> {
        return await this.model.findByIdAndRemove(id);
    }

    async update(id: string, item: WeatherData): Promise<WeatherData> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }
}
