import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { Gateway } from 'dataLayer/entities/Gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { CreateGatewayDto, CreateGatewayResult } from 'services/dto/gateway.dto';
import { GatewayService } from 'services/gateway.service';
import { foreignKey } from 'utils/schemaHelper';

@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
@Controller('gateway')
export class GatewayController {
    constructor(
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayService: GatewayService,
        private readonly cookieHelper: CookieHelper
    ) {}

    @Get()
    async findAllByWorkspaceAsync(@Req() request): Promise<Gateway[]> {
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }

        return this.gatewayService.getAllGatewaysForWorkspace(workspaceId);
    }

    @Get(':id')
    async findByIdAsync(@Param('id') id: string): Promise<Gateway> {
        const gateway = await this.gatewayRepository.findByIdAsync(foreignKey(id));
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

        return this.gatewayService.createAsync(foreignKey(workspaceId), createDto);
    }
}
