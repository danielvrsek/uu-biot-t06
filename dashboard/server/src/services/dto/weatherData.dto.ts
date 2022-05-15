import { WeatherData } from 'dataLayer/entities/weatherData.entity';

export interface CreateWeatherDataDto {
    data: WeatherData[];
    temperature: number;
    humidity: number;
}
