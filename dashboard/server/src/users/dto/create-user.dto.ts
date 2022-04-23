export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly id?: string;
  readonly roles?: string[];
}
