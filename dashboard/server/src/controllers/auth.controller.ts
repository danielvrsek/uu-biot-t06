import { Controller, Req, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthConstants } from 'auth/common/authConstants';
import { Public } from 'auth/decorator/jwt.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { Cookies } from 'common/cookies';
import { Request, Response } from 'express';
import { AuthService } from 'services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async loginAsync(@Req() request, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.generateToken(request.user);
        response.cookie(Cookies.AuthCookie, token);
        response.status(200);
        response.json(request.user);
        response.end();
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Res() response: Response): void {
        response.clearCookie(Cookies.AuthCookie);
        response.clearCookie(Cookies.CurrentWorkspace);
        response.statusCode = 200;
        response.end();
    }

    @Get('user-info')
    @UseGuards(JwtAuthGuard)
    async getUserInfoAsync(@Req() request) {
        return request.user;
    }
}
