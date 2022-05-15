import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'dataLayer/entities/user.entity';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { comparePasswords } from 'utils/bcrypt';
import { UserInfo } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

    async validateUserAsync(username: string, password: string): Promise<UserInfo> {
        const user = await this.userRepository.findByUsernameAsync(username);
        if (!user) {
            return null;
        }

        const matched = comparePasswords(password, user.passwordHash);
        if (!matched) {
            throw new HttpException('Login failed.', HttpStatus.FORBIDDEN);
        }

        return {
            id: user._id,
            firstName: user.firstName,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
        };
    }

    generateToken(user: UserInfo) {
        return this.jwtService.sign(user);
    }
}
