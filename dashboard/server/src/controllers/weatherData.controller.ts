import { Controller, Get, Post, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { CookieHelper } from 'common/cookieHelper';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { InsertWeatherDataDto as InsertWeatherDataDto } from 'services/dto/weatherData.dto';
import { WeatherDataService } from 'services/weatherData.service';

@UseGuards(JwtAuthGuard)
@Controller('weather-data')
export class WeatherDataController {
    constructor(
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService,
        private readonly cookieHelper: CookieHelper
    ) {}

    @UseGuards(TokenTypeGuard)
    @EnforceTokenType(TokenType.User)
    @Get()
    findAllForCurrentWorkspaceAsync(@Req() request): Promise<WeatherData[]> {
        const workspaceId = this.cookieHelper.getCurrentUserWorkspaceId(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }

        return this.weatherDataRepository.findAllAsync();
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
    async insertAsync(@Req() request, @Body() insertDto: InsertWeatherDataDto): Promise<{ count: number }> {
        const count = await this.weatherDataService.insertAsync(request.user.gatewayId, insertDto);
        return {
            count,
        };
    }
}
