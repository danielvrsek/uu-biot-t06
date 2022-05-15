import IEntity from './entity';

export default interface WeatherData extends IEntity {
    gatewayId: string;
    humidity: number;
    temperature: number;
    timestamp: Date;
}
