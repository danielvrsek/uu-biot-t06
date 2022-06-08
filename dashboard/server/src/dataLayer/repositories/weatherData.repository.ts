import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

@Injectable()
export class WeatherDataRepository {
    constructor(
        @InjectModel(SchemaConstants.WeatherData)
        private readonly model: Model<WeatherData>
    ) {}

    async findAllAsync(): Promise<WeatherData[]> {
        return await this.model.find();
    }

    async findAllByGatewayIdAsync(gatewayId: Types.ObjectId, dateFrom?: Date, dateTo?: Date): Promise<WeatherData[]> {
        return await this.model.find({
            gatewayId: objectId(gatewayId),
            timestamp: {
                $gte: dateFrom ? startOfDay(dateFrom) : new Date(-8640000000000000),
                $lte: dateTo ? endOfDay(dateTo) : new Date(8640000000000000),
            },
        });
    }
}
