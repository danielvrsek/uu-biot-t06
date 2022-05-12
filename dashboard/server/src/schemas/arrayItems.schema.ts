import * as mongoose from 'mongoose';
import { TemperatureSchema } from 'src/schemas/item.schema';

export const ArrayItemsSchema = new mongoose.Schema({
  arrayItems: [TemperatureSchema],
});
