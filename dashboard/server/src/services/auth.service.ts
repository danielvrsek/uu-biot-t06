import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'auth/common/tokenType';
import { Cookies } from 'common/cookies';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { comparePasswords } from 'utils/bcrypt';
import { GatewayInfo } from './dto/gateway.dto';
import { UserInfo } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly gatewayRepository: GatewayRepository,
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly jwtService: JwtService
    ) {}

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
            tokenType: TokenType.User,
        };
    }

    async validateGatewayAsync(workspaceId: string, secret: string): Promise<GatewayInfo> {
        const authorization = await this.gatewayAuthorizationRepository.findBySecretAsync(workspaceId, secret);
        if (!authorization) {
            throw new UnauthorizedException();
        }

        const gateway = await this.gatewayRepository.findByIdAsync(authorization.gatewayId);
        if (gateway.state != GatewayState.Created) {
            throw new BadRequestException();
        }

        gateway.state = GatewayState.Registered;

        return {
            id: gateway._id,
            workspaceId: workspaceId,
            tokenType: TokenType.Gateway,
        };
    }

    getCurrentUserWorkspace(request) {
        return request.cookies[Cookies.CurrentWorkspace];
    }

    generateToken(data: UserInfo | GatewayInfo) {
        return this.jwtService.sign(data);
    }
}
