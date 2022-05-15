import { Controller, Get, Post, Body, Param, UseGuards, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { Cookies } from 'common/cookies';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CreateWorkspaceDto, CurrentWorkspaceViewModel, SetCurrentWorkspaceDto } from 'services/dto/workspace.dto';
import { WorkspaceService } from 'services/workspace.service';

@UseGuards(JwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService
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
        const workspaceId = request.cookies[Cookies.CurrentWorkspace];
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
