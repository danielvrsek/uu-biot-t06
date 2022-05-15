import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { Gateway } from 'dataLayer/entities/gateway.entity';

@Injectable()
export class GatewayRepository {
    constructor(
        @InjectModel(SchemaConstants.Gateway)
        private readonly model: Model<Gateway>
    ) {}

    async findAllByWorkspaceAsync(workspaceId: string): Promise<Gateway[]> {
        return await this.model.find({ workspaceId });
    }

    async findByIdAsync(workspaceId: string, id: string): Promise<Gateway> {
        return await this.model.findOne({ _id: id, workspaceId });
    }

    async findBySecretAsync(secret: string, workspaceId: string): Promise<Gateway> {
        const gateway = await this.model.findOne({ secret, workspaceId });
        if (!gateway) {
            throw new HttpException('User with this mail does not exist', HttpStatus.NOT_FOUND);
        }

        return gateway;
    }
}
