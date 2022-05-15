import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'dataLayer/entities/user.entity';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { comparePasswords } from 'utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<boolean> {
        const user = await this.userRepository.findOne(email);
        if (user) {
            const matched = comparePasswords(password, user.passwordHash);
            if (matched) {
                return true;
            }
            throw new HttpException('Passwords do not Match.', HttpStatus.FORBIDDEN);
        }

        return false;
    }

    login(user: User) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastname,
        });
    }
}
