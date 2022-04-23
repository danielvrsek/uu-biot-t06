import * as mongoose from 'mongoose';

export const TemperatureSchema = new mongoose.Schema({
  timeStamp: Date,
  temperature: Number,
  humidity: Number,
});
