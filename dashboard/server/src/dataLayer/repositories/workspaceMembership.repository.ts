import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';

@Injectable()
export class WorkspaceMembershipRepository {
    constructor(@InjectModel(SchemaConstants.WorkspaceMembership) private readonly model: Model<WorkspaceMembership>) {}

    async getMembershipsForUserByWorkspaceAsync(
        userId: Types.ObjectId,
        workspaceId: Types.ObjectId
    ): Promise<WorkspaceMembership> {
        return await this.model.findOne({ userId, workspaceId });
    }
}
