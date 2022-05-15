import * as mongoose from 'mongoose';

export const WorkspaceSchema = new mongoose.Schema({
    name: String,
});
