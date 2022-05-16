import { Controller, Get, Post, Body, Param, UseGuards, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'common/cookieHelper';
import { Cookies } from 'common/cookies';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CreateWorkspaceDto, CurrentWorkspaceViewModel, SetCurrentWorkspaceDto } from 'services/dto/workspace.dto';
import { WorkspaceService } from 'services/workspace.service';

@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
@Controller('workspace')
export class WorkspaceController {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService,
        private readonly cookieHelper: CookieHelper
    ) {}

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
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            return { id: null };
        }

        return await this.workspaceRepository.findByIdAsync(workspaceId);
    }

    @Put('user/current')
    async setCurrentAsync(@Body() body: SetCurrentWorkspaceDto, @Req() request, @Res() response): Promise<void> {
        const availableWorkspaces = await this.workspaceRepository.findAllForUserAsync(request.user.id);
        if (!availableWorkspaces.some((x) => x._id == body.workspaceId)) {
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
    createAsync(@Body() createDto: CreateWorkspaceDto): Promise<Workspace> {
        return this.workspaceService.createAsync(createDto);
    }
}
