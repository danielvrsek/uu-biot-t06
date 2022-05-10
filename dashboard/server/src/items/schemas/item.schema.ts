import * as mongoose from 'mongoose';

export const TemperatureSchema = new mongoose.Schema({
  timestamp: Number,
  temperature: Number,
  humidity: Number,
});
