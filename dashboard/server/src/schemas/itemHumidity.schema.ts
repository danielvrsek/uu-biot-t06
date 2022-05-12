import * as mongoose from 'mongoose';

export const ItemHumiditySchema = new mongoose.Schema({
  timestamp: Date,
  humidity: Number,
});
