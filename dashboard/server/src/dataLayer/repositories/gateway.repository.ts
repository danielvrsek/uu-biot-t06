import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { Types } from 'mongoose';

@Injectable()
export class GatewayRepository {
    constructor(@InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>) {}

    async findAllByIdAsync(ids: string[]) {
        return await this.model.find({
            _id: { $in: ids },
        });
    }

    async findByIdAsync(id: string): Promise<Gateway> {
        return await this.model.findOne({ _id: id });
    }
}
