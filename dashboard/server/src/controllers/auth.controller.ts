import { Controller, Req, Post, UseGuards, Res, Get, HttpCode } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { Public } from 'auth/decorator/jwt.decorator';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { LocalGatewayAuthGuard } from 'auth/guards/local-gateway.guard';
import { LocalUserAuthGuard } from 'auth/guards/local-user.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { Cookies } from 'common/cookies';
import { Response } from 'express';
import { AuthService } from 'services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalUserAuthGuard)
    login(@Req() request, @Res({ passthrough: true }) response: Response): void {
        const token = this.authService.generateToken(request.user);
        response.cookie(Cookies.AuthCookie, token);
        response.status(200);
        response.json(request.user);
        response.end();
    }

    @Public()
    @HttpCode(200)
    @Post('gateway/authorize')
    @UseGuards(LocalGatewayAuthGuard)
    authorizeGateway(@Req() request): { token: string } {
        return { token: this.authService.generateToken(request.user) };
    }

    @Post('logout')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    logout(@Res() response: Response): void {
        response.clearCookie(Cookies.AuthCookie);
        response.clearCookie(Cookies.CurrentWorkspace);
        response.statusCode = 200;
        response.end();
    }

    @Get('user-info')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    async getUserInfoAsync(@Req() request) {
        return request.user;
    }
}
