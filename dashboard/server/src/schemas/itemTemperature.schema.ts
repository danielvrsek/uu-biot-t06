import * as mongoose from 'mongoose';

export const ItemTemperatureSchema = new mongoose.Schema({
  timestamp: Date,
  temperature: Number,
});
