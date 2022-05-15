export interface CreateUserDto {
    firstName: string;
    lastname: string;
    email: string;
    passwordRaw: string;
}

export interface UpdateUserDto {
    firstName: string;
    lastname: string;
    email: string;
}
