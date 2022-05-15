import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    firstName: String,
    lastname: String,
    passwordHash: String,
});
