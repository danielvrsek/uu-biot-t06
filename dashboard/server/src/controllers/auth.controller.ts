import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common';
import { AuthConstants } from 'auth/common/authConstants';
import { Public } from 'auth/decorator/jwt.decorator';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { AuthService } from 'services/auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() request, @Res({ passthrough: true }) response) {
        const token = await this.authService.login(request.user);
        response.cookie(AuthConstants.AuthCookieName, token);
    }
}
