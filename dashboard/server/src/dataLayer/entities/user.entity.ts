import IEntity from './entity';

export default interface User extends IEntity {
    firstName: string;
    lastname: string;
    email: string;
    passwordHash: string;
}
