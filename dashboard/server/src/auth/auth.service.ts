import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const matched = comparePasswords(password, user.password);
      if (matched) {
        return user;
      }
      throw new HttpException('Passwords do not Match.', HttpStatus.FORBIDDEN);
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
