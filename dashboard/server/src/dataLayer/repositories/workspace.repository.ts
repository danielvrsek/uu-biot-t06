import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Workspace from 'dataLayer/entities/Workspace.entity';

@Injectable()
export class WorkspaceRepository {
    constructor(
        @InjectModel('Workspace')
        private readonly model: Model<Workspace>
    ) {}

    async findAll(): Promise<Workspace[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<Workspace> {
        return await this.model.findOne({ _id: id });
    }
}
