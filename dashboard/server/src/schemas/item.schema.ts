import * as mongoose from 'mongoose';

export const TemperatureSchema = new mongoose.Schema({
  timestamp: Date,
  temperature: Number,
  humidity: Number,
});
