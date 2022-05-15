import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { Types } from 'mongoose';

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

    async findBySecretAsync(workspaceId: string, secret: string): Promise<Gateway> {
        const gateway = await this.model.findOne({ workspaceId: new Types.ObjectId(workspaceId), secret });
        if (!gateway) {
            return null;
        }

        return gateway;
    }
}
