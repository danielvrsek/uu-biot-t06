import { Controller, Get, Post, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { WeatherDataService } from 'services/weatherData.service';
import { GatewayService } from 'services/gateway.service';
import { objectId } from 'utils/schemaHelper';
import { ControllerBase } from './controllerBase';
import {
    GetWeatherDataForWorkspaceResponse,
    InsertWeatherDataDto,
    InsertWeatherDataResponse,
} from 'services/dto/weatherData.dto';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';

@Controller('weather-data')
export class WeatherDataController extends ControllerBase {
    constructor(
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService,
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayService: GatewayService,
        workspaceRepository: WorkspaceRepository,
        cookieHelper: CookieHelper
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @Get()
    async findAllForCurrentWorkspaceAsync(@Req() request): Promise<GetWeatherDataForWorkspaceResponse[]> {
        const workspace = await this.getCurrentWorkspaceAsync(request);

        const availableGateways = await this.gatewayService.getAllGatewaysForWorkspace(workspace._id);
        const result: GetWeatherDataForWorkspaceResponse[] = [];
        for (const gateway of availableGateways) {
            result.push({
                gatewayId: gateway.id,
                gatewayName: gateway.name,
                data: (await this.weatherDataRepository.findAllByGatewayIdAsync(gateway.id)).map((data) => ({
                    temperature: data.temperature,
                    humidity: data.humidity,
                    timestamp: data.timestamp,
                })),
            });
        }

        return result;
    }

    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @Get('gateway/:gatewayId')
    findByGatewayIdAsync(@Param('gatewayId') gatewayId): Promise<WeatherData[]> {
        return this.weatherDataRepository.findAllByGatewayIdAsync(gatewayId);
    }

    @EnforceTokenType(TokenType.Gateway)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @Post()
    async insertAsync(@Req() request, @Body() insertDto: InsertWeatherDataDto): Promise<InsertWeatherDataResponse> {
        const gateway = await this.gatewayRepository.findByIdAsync(objectId(request.user.gatewayId));
        if (!gateway) {
            throw new BadRequestException('Invalid gateway');
        }

        const count = await this.weatherDataService.insertAsync(gateway._id, insertDto);
        return {
            count,
        };
    }
}
