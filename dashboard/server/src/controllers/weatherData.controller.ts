import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Public } from 'auth/decorator/jwt.decorator';
import WeatherData from 'dataLayer/entities/weatherData.entity';
import { WeatherDataRepository } from 'dataLayer/repositories/weatherData.repository';
import { CreateWeatherDataDto } from 'services/dto/weatherData.dto';
import { WeatherDataService } from 'services/weatherData.service';

@Controller('weather-data')
export class WeatherDataController {
    constructor(
        private readonly weatherDataRepository: WeatherDataRepository,
        private readonly weatherDataService: WeatherDataService
    ) {}

    @Public()
    @Get()
    findAll(): Promise<WeatherData[]> {
        return this.weatherDataRepository.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id): Promise<WeatherData> {
        return this.weatherDataRepository.findOne(id);
    }
    @Public()
    @Post()
    create(@Body() createDto: CreateWeatherDataDto): Promise<WeatherData> {
        return this.weatherDataService.create(createDto);
    }
}
