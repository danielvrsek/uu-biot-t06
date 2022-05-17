import { Controller, Get, Post, Body, Param, UseGuards, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { Cookies } from 'common/cookies';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CreateWorkspaceDto, CurrentWorkspaceViewModel, SetCurrentWorkspaceDto } from 'services/dto/workspace.dto';
import { WorkspaceService } from 'services/workspace.service';
import { Role } from 'dataLayer/entities/enums/role.enum';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { ControllerBase } from './controllerBase';

@Controller('workspace')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class WorkspaceController extends ControllerBase {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService,
        private readonly userRepository: UserRepository,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, workspaceRepository, userRepository);
    }

    @Get()
    findAllAsync(): Promise<Workspace[]> {
        return this.workspaceRepository.findAllAsync();
    }

    @Get('user')
    findAllForCurrentUser(@Req() request) {
        return this.workspaceRepository.findAllForUserAsync(request.user.id);
    }

    @Get('user/current')
    async getCurrentAsync(@Req() request): Promise<CurrentWorkspaceViewModel> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        return await this.workspaceRepository.findByIdAsync(workspace._id);
    }

    @Put('user/current')
    async setCurrentAsync(@Body() body: SetCurrentWorkspaceDto, @Req() request, @Res() response): Promise<void> {
        const availableWorkspaces = await this.workspaceRepository.findAllForUserAsync(request.user.id);
        if (!availableWorkspaces.some((x) => x._id.toString() == body.workspaceId)) {
            throw new UnauthorizedException();
        }

        response.cookie(Cookies.CurrentWorkspace, body.workspaceId);
        response.status(200);
        response.end();
    }

    @Get(':id')
    findByIdAsync(@Param('id') id): Promise<Workspace> {
        return this.workspaceRepository.findByIdAsync(id);
    }

    @Post()
    async createAsync(@Req() request, @Body() createDto: CreateWorkspaceDto): Promise<Workspace> {
        const user = await this.getCurrentUserAsync(request);
        const workspace = await this.workspaceService.createAsync(createDto);
        await this.workspaceService.addUserToWorkspace(workspace._id, user._id, [Role.Admin]);

        return workspace;
    }
}
