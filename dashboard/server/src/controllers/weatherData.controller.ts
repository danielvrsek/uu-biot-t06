import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { CreateWeatherDataDto as InsertWeatherDataDto } from 'services/dto/weatherData.dto';
import { WeatherDataService } from 'services/weatherData.service';

@EnforceTokenType(TokenType.Gateway)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
@Controller('weather-data')
export class WeatherDataController {
    constructor(
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService
    ) {}

    @Get()
    findAllAsync(): Promise<WeatherData[]> {
        return this.weatherDataRepository.findAllAsync();
    }

    @Get(':id')
    findByIdAsync(@Param('id') id): Promise<WeatherData> {
        return this.weatherDataRepository.findByIdAsync(id);
    }

    @Post()
    insertAsync(@Body() insertDto: InsertWeatherDataDto): Promise<WeatherData> {
        return this.weatherDataService.createAsync(insertDto);
    }
}
