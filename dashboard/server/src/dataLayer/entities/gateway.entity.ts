import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';

@Schema({ timestamps: true })
export class Gateway {
    _id: string;

    @Prop() name: string;
    @Prop() state: GatewayState;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
