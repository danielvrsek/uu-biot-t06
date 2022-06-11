/* eslint-disable no-console */
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { WorkspaceService } from 'services/workspace.service';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { GatewayService } from 'services/gateway.service';

@Injectable()
export class SeedCommand {
    constructor(
        private readonly userService: UserService,
        private readonly workspaceService: WorkspaceService,
        private readonly gatewayService: GatewayService
    ) {}

    @Command({ command: 'seed', describe: 'Seed data' })
    async seedAsync() {
        const user1 = await this.userService.createAsync({
            firstName: 'Test',
            lastname: 'User',
            email: 'user@user.com',
            username: 'user',
            passwordRaw: 'user',
            isExternal: false,
            profilePhotoUrl: null,
        });
        console.log(user1);

        const user2 = await this.userService.createAsync({
            firstName: 'Test',
            lastname: 'Admin',
            email: 'admin@admin.com',
            username: 'admin',
            passwordRaw: 'admin',
            isExternal: false,
            profilePhotoUrl: null,
        });
        console.log(user2);

        const workspace1 = await this.workspaceService.createAsync({
            name: 'Default workspace',
        });
        console.log(workspace1);

        const workspaceMembership1 = await this.workspaceService.addUserToWorkspace(workspace1._id, user1._id, [
            UserRole.User,
        ]);
        console.log(workspaceMembership1);

        const workspaceMembership2 = await this.workspaceService.addUserToWorkspace(workspace1._id, user2._id, [
            UserRole.Admin,
        ]);
        console.log(workspaceMembership2);

        const gateway1 = await this.gatewayService.createAsync(workspace1._id, {
            name: 'Default gateway',
        });
        console.log(gateway1);
    }
}
