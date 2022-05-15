import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Schema({ timestamps: true })
export class Gateway {
    _id: string;

    @Prop() name: string;
    @Prop() secret: string;
    @Prop() state: GatewayState;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Workspace })
    workspaceId: Types.ObjectId;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
