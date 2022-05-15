import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class WeatherData {
    _id: string;

    @Prop() gatewayId: string;
    @Prop() humidity: number;
    @Prop() temperature: number;
}

export const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);
