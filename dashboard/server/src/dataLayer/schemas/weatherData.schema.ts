import * as mongoose from 'mongoose';

export const WeatherDataSchema = new mongoose.Schema({
    gatewayId: String,
    humidity: Number,
    temperature: Number,
    timestamp: Date,
});
