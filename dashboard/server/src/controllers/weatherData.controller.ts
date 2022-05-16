import { Controller, Get, Post, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'utils/cookieHelper';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import {
    GetWeatherDataForWorkspaceResponse,
    InsertWeatherDataDto as InsertWeatherDataDto,
    InsertWeatherDataResponse,
} from 'services/dto/weatherData.dto';
import { WeatherDataService } from 'services/weatherData.service';
import { GatewayService } from 'services/gateway.service';

@UseGuards(JwtAuthGuard)
@Controller('weather-data')
export class WeatherDataController {
    constructor(
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService,
        private readonly gatewayService: GatewayService,
        private readonly cookieHelper: CookieHelper
    ) {}

    @UseGuards(TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @Get()
    async findAllForCurrentWorkspaceAsync(@Req() request): Promise<GetWeatherDataForWorkspaceResponse[]> {
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }

        const availableGateways = await this.gatewayService.getAllGatewaysForWorkspace(workspaceId);
        console.log(availableGateways);
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

    @UseGuards(TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @Get('gateway/:gatewayId')
    findByGatewayIdAsync(@Param('gatewayId') gatewayId): Promise<WeatherData[]> {
        return this.weatherDataRepository.findAllByGatewayIdAsync(gatewayId);
    }

    @UseGuards(TokenTypeGuard)
    @EnforceTokenType(TokenType.Gateway)
    @Post()
    async insertAsync(@Req() request, @Body() insertDto: InsertWeatherDataDto): Promise<InsertWeatherDataResponse> {
        const count = await this.weatherDataService.insertAsync(request.user.gatewayId, insertDto);
        return {
            count,
        };
    }
}
