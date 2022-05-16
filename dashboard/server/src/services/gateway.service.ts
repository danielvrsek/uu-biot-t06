import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { CreateGatewayDto, CreateGatewayResult } from './dto/gateway.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';
import { CryptoHelper } from 'utils/cryptoHelper';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { foreignKey } from 'utils/schemaHelper';

@Injectable()
export class GatewayService {
    constructor(
        @InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>,
        @InjectModel(SchemaConstants.GatewayAuthorization)
        private readonly authorizationModel: Model<GatewayAuthorization>,
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly gatewayRepository: GatewayRepository,
        private readonly cryptoHelper: CryptoHelper
    ) {}

    async createAsync(workspaceId: Types.ObjectId, createDto: CreateGatewayDto): Promise<CreateGatewayResult> {
        const gateway = await new this.model({
            name: createDto.name,
            state: GatewayState.Created,
        }).save();

        const secret = this.cryptoHelper.generatePassword(12);
        await new this.authorizationModel({
            secret,
            gatewayId: gateway._id,
            workspaceId,
        }).save();

        return { gateway, secret };
    }

    async getAllGatewaysForWorkspace(workspaceId: string) {
        const authorizations = await this.gatewayAuthorizationRepository.findAllByWorkspaceAsync(
            foreignKey(workspaceId)
        );
        console.log(authorizations);
        return await this.gatewayRepository.findAllByIdAsync(authorizations.map((x) => x.gatewayId));
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
