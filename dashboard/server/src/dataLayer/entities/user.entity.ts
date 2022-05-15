import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop() firstName: string;
    @Prop() lastname: string;
    @Prop() email: string;
    @Prop() username: string;
    @Prop() passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
