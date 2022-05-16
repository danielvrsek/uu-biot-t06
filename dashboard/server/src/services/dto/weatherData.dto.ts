export interface InsertWeatherDataDto {
    data: WeatherDataDto[];
}

export interface WeatherDataDto {
    temperature: number;
    humidity: number;
    timestamp: Date;
}
