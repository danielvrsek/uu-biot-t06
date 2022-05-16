import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { CreateGatewayDto, CreateGatewayResult } from './dto/gateway.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';

@Injectable()
export class GatewayService {
    constructor(
        @InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>,
        @InjectModel(SchemaConstants.GatewayAuthorization)
        private readonly authorizationModel: Model<GatewayAuthorization>
    ) {}

    async createAsync(workspaceId: string, createDto: CreateGatewayDto): Promise<CreateGatewayResult> {
        const gateway = await new this.model({
            name: createDto.name,
            state: GatewayState.Created,
        }).save();

        const secret = 'gateway';
        await new this.authorizationModel({
            secret,
            gatewayId: gateway._id,
            workspaceId,
        }).save();

        return { gateway, secret };
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
