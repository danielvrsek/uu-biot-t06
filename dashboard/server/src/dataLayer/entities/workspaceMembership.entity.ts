import { Role } from '../schemas/enums/role.enum';
import IEntity from './entity';
import User from './user.entity';
import Workspace from './workspace.entity';

export default interface WorkspaceMembership extends IEntity {
    workspace: Workspace;
    user: User;
    roles: Role[];
}
