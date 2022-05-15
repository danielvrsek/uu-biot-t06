import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/workspace.dto';
import Workspace from 'dataLayer/entities/workspace.entity';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel('Workspace')
        private readonly model: Model<Workspace>
    ) {}

    async create(item: CreateWorkspaceDto): Promise<Workspace> {
        const newItem = new this.model(item);
        return await newItem.save();
    }

    async delete(id: string): Promise<Workspace> {
        return await this.model.findByIdAndRemove(id);
    }

    async update(id: string, item: Workspace): Promise<Workspace> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }
}
