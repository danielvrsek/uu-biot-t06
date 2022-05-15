import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConstants } from '../common/authConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            ignoreExpiration: false,
            secretOrKey: AuthConstants.JwtSecret,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    const data = request?.cookies[AuthConstants.AuthCookieName];
                    if (!data) {
                        return null;
                    }
                    return data;
                },
            ]),
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
