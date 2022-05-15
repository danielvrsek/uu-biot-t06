import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Workspace {
    _id: string;

    @Prop() name: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
