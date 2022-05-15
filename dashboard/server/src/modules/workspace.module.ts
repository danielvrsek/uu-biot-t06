import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceController } from 'controllers/workspace.controller';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WorkspaceSchema } from 'dataLayer/entities/workspace.entity';
import { WorkspaceMembershipSchema } from 'dataLayer/entities/workspaceMembership.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { WorkspaceService } from 'services/workspace.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SchemaConstants.Workspace, schema: WorkspaceSchema }]),
        MongooseModule.forFeature([{ name: SchemaConstants.WorkspaceMembership, schema: WorkspaceMembershipSchema }]),
    ],
    controllers: [WorkspaceController],
    providers: [WorkspaceService, WorkspaceRepository],
    exports: [WorkspaceService],
})
export class WorkspaceModule {}
