import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Workspace {
    _id: Types.ObjectId;

    @Prop() name: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
