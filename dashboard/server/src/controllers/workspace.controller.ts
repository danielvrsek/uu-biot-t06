import { Controller, Get, Post, Body, Param, UseGuards, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { cookieOptions, Cookies } from 'common/cookies';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CreateWorkspaceDto, CurrentWorkspaceViewModel, SetCurrentWorkspaceDto } from 'services/dto/workspace.dto';
import { WorkspaceService } from 'services/workspace.service';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { ControllerBase } from './controllerBase';
import { UserRequest } from 'common/request';
import { objectId } from 'utils/schemaHelper';
import { Response } from 'express';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserDto } from 'services/dto/user.dto';

@Controller('workspaces')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class WorkspaceController extends ControllerBase {
    constructor(
        private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService,
        private readonly userRepository: UserRepository,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Get()
    findAllAsync(): Promise<Workspace[]> {
        return this.workspaceRepository.findAllAsync();
    }

    @Get('user')
    findAllForCurrentUser(@Req() request: UserRequest<void>) {
        return this.workspaceRepository.findAllForUserAsync(objectId(request.user.userId));
    }

    @Get('user/current')
    async getCurrentAsync(@Req() request: UserRequest<void>): Promise<CurrentWorkspaceViewModel> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        return await this.workspaceRepository.findByIdAsync(workspace._id);
    }

    @Put('user/current')
    async setCurrentAsync(
        @Body() body: SetCurrentWorkspaceDto,
        @Req() request: UserRequest<void>,
        @Res() response: Response
    ): Promise<void> {
        const availableWorkspaces = await this.workspaceRepository.findAllForUserAsync(objectId(request.user.userId));
        const workspace = availableWorkspaces.filter((x) => x._id.toString() == body.workspaceId)[0];
        if (!workspace) {
            throw new UnauthorizedException();
        }

        response.cookie(Cookies.CurrentWorkspace, workspace._id, cookieOptions);
        response.status(200);
        response.end();
    }

    @Get(':id')
    findByIdAsync(@Param('id') id): Promise<Workspace> {
        return this.workspaceRepository.findByIdAsync(id);
    }

    @Get(':id/users')
    async getAllUsersForWorkspaceAsync(@Param('id') id): Promise<UserDto[]> {
        const memberships = await this.workspaceMembershipRepository.getAllMembershipsByWorkspaceAsync(objectId(id));
        const users = await this.userRepository.findAllByIdsAsync(memberships.map((x) => x.userId));
        return users.map((x) => ({
            userId: x._id.toString(),
            firstName: x.firstName,
            lastname: x.lastname,
            email: x.email,
            username: x.username,
        }));
    }

    @Post()
    async createAsync(@Req() request: UserRequest<void>, @Body() createDto: CreateWorkspaceDto): Promise<Workspace> {
        const user = await this.getCurrentUserAsync(request);
        const workspace = await this.workspaceService.createAsync(createDto);
        await this.workspaceService.addUserToWorkspace(workspace._id, user._id, [UserRole.Admin]);

        return workspace;
    }
}
