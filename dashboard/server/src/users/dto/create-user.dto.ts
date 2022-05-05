export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly id?: string;
  readonly roles?: string[];
}
