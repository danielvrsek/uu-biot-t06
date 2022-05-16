import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'common/cookieHelper';
import { Gateway } from 'dataLayer/entities/Gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { CreateGatewayDto, CreateGatewayResult } from 'services/dto/gateway.dto';
import { GatewayService } from 'services/gateway.service';

@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
@Controller('gateway')
export class GatewayController {
    constructor(
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly gatewayService: GatewayService,
        private readonly cookieHelper: CookieHelper
    ) {}

    @Get()
    async findAllByWorkspaceAsync(@Req() request): Promise<Gateway[]> {
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }

        const authorizations = await this.gatewayAuthorizationRepository.findAllByWorkspaceAsync(workspaceId);

        return await this.gatewayRepository.findAllByIdAsync(authorizations.map((x) => x.gatewayId));
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id: string): Promise<Gateway> {
        const gateway = await this.gatewayRepository.findByIdAsync(id);
        if (!gateway) {
            throw new NotFoundException();
        }

        return gateway;
    }

    @Post()
    createAsync(@Req() request, @Body() createDto: CreateGatewayDto): Promise<CreateGatewayResult> {
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }
        // TODO: check user authorization for the workspace

        return this.gatewayService.createAsync(workspaceId, createDto);
    }
}
