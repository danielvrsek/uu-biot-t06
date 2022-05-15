import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { CreateGatewayDto } from './dto/gateway.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';

@Injectable()
export class GatewayService {
    constructor(@InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>) {}

    async createAsync(workspaceId: string, secret: string, createDto: CreateGatewayDto): Promise<Gateway> {
        const newItem = new this.model({
            name: createDto.name,
            state: GatewayState.Created,
            workspaceId,
            secret,
        });
        return await newItem.save();
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
