import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Public } from 'auth/decorator/jwt.decorator';
import Workspace from 'dataLayer/entities/workspace.entity';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CreateWorkspaceDto } from 'services/dto/workspace.dto';
import { WorkspaceService } from 'services/workspace.service';

@Controller('workspace')
export class WorkspaceController {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly workspaceService: WorkspaceService
    ) {}

    @Public()
    @Get()
    findAll(): Promise<Workspace[]> {
        return this.workspaceRepository.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id): Promise<Workspace> {
        return this.workspaceRepository.findOne(id);
    }
    @Public()
    @Post()
    create(@Body() createDto: CreateWorkspaceDto): Promise<Workspace> {
        return this.workspaceService.create(createDto);
    }
}
