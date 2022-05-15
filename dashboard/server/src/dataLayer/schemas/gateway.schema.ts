import * as mongoose from 'mongoose';
import { GatewayState } from './enums/gatewayState.enum';

export const GatewaySchema = new mongoose.Schema({
    name: String,
    state: GatewayState,
});
