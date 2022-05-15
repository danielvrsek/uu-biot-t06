import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { Gateway } from 'dataLayer/entities/Gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';

@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
@Controller('workspace/:workspaceId/gateway')
export class GatewayController {
    constructor(private readonly gatewayRepository: GatewayRepository) {}

    @Get()
    findAllByWorkspaceAsync(@Param('workspaceId') workspaceId): Promise<Gateway[]> {
        return this.gatewayRepository.findAllByWorkspaceAsync(workspaceId);
    }

    @Get(':id')
    async findByIdAsync(@Param('workspaceId') workspaceId: string, @Param('id') id: string): Promise<Gateway> {
        const gateway = await this.gatewayRepository.findByIdAsync(workspaceId, id);
        if (!gateway) {
            throw new NotFoundException();
        }

        return gateway;
    }
}
