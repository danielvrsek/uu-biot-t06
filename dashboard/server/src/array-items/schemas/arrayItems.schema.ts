import * as mongoose from 'mongoose';
import { TemperatureSchema } from 'src/items/schemas/item.schema';

export const ArrayItemsSchema = new mongoose.Schema({
  arrayItems: [TemperatureSchema],
});
