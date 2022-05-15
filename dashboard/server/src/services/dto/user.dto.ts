export interface CreateUserDto {
    firstName: string;
    lastname: string;
    email: string;
    username: string;
    passwordRaw: string;
}

export interface UpdateUserDto {
    firstName: string;
    lastname: string;
    email: string;
}

export interface UserInfo {
    id: string;
    username: string;
    firstName: string;
    lastname: string;
    email: string;
}
