import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from 'dataLayer/entities/Workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class WorkspaceRepository {
    constructor(
        @InjectModel(SchemaConstants.Workspace)
        private readonly model: Model<Workspace>
    ) {}

    async findAllAsync(): Promise<Workspace[]> {
        return await this.model.find();
    }

    async findAllForUserAsync(userId: string): Promise<Workspace[]> {
        return await this.model.find({ userId });
    }

    async findByIdAsync(id: string): Promise<Workspace> {
        return await this.model.findOne({ _id: id });
    }
}
