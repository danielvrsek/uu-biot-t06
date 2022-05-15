import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Public } from 'auth/decorator/jwt.decorator';
import { Gateway } from 'dataLayer/entities/Gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { AuthenticateGatewayDto } from 'services/dto/gateway.dto';
import { GatewayService } from 'services/gateway.service';

@Controller('workspace/:workspaceId/gateway')
export class GatewayController {
    constructor(
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayService: GatewayService
    ) {}

    @Get()
    findAllByWorkspaceAsync(@Param('workspaceId') workspaceId): Promise<Gateway[]> {
        return this.gatewayRepository.findAllByWorkspaceAsync(workspaceId);
    }

    @Get(':id')
    findByIdAsync(@Param('workspaceId') workspaceId, @Param('id') id): Promise<Gateway> {
        return this.gatewayRepository.findByIdAsync(workspaceId, id);
    }

    @Post('authenticate')
    authenticateAsync(@Body() authenticateDto: AuthenticateGatewayDto): Promise<Gateway> {
        return this.gatewayService.authenticateAsync(authenticateDto);
    }
}
