import { Types } from 'mongoose';

export const foreignKey = (prop) => new Types.ObjectId(prop);
