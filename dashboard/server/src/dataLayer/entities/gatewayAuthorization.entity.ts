import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Schema({ timestamps: true })
export class GatewayAuthorization {
    _id: string;

    @Prop() secret: string;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Gateway })
    gatewayId: string;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Workspace })
    workspaceId: string;
}

export const GatewayAuthorizationSchema = SchemaFactory.createForClass(GatewayAuthorization);
