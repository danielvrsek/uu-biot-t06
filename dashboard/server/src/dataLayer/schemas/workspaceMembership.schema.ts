import * as mongoose from 'mongoose';
import { Role } from './enums/role.enum';

export const WorkspaceMembershipSchema = new mongoose.Schema({
    workspace: { type: mongoose.Types.ObjectId, ref: 'Workspace' },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    roles: [Role],
});
