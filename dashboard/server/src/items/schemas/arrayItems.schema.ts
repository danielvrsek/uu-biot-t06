import * as mongoose from 'mongoose';
import { TemperatureSchema } from './item.schema';

export const ArrayItemsSchema = new mongoose.Schema({
  arryItems: [TemperatureSchema],
});
