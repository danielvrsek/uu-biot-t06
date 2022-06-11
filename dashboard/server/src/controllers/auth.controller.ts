import { Controller, Req, Post, UseGuards, Res, Get, HttpCode, UnauthorizedException } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { LocalGatewayAuthGuard } from 'auth/guards/local-gateway.guard';
import { LocalUserAuthGuard } from 'auth/guards/local-user.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { cookieOptions, Cookies } from 'common/cookies';
import { UserRequest } from 'common/request';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { Response } from 'express';
import { AuthService } from 'services/auth.service';
import { UserInfo, WorkspaceInfo } from 'services/dto/user.dto';
import { CookieHelper } from 'utils/cookieHelper';
import { ControllerBase } from './controllerBase';

@Controller('auth')
export class AuthController extends ControllerBase {
    constructor(
        private authService: AuthService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository,
        userRepository: UserRepository
    ) {
        super(cookieHelper, workspaceRepository, userRepository);
    }

    @Post('login')
    @UseGuards(LocalUserAuthGuard)
    async loginAsync(@Req() request: UserRequest<void>, @Res({ passthrough: true }) response: Response): Promise<void> {
        const token = this.authService.generateToken(request.user);

        response.cookie(Cookies.AuthCookie, token, cookieOptions);
        response.status(200);
        //response.json(await this.getWorkspaceUserInfoAsync(request.user, workspace._id));
        response.end();
    }

    @Post('logout')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    logout(@Res() response: Response): void {
        response.clearCookie(Cookies.AuthCookie, cookieOptions);
        response.clearCookie(Cookies.CurrentWorkspace, cookieOptions);
        response.statusCode = 200;
        response.end();
    }

    @Get('user-info')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    async getUserInfoAsync(@Req() request: UserRequest<void>): Promise<UserInfo> {
        return request.user;
    }

    @Get('workspace-info')
    @EnforceTokenType(TokenType.User)
    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    async getWorkspaceInfoAsync(@Req() request: UserRequest<void>): Promise<WorkspaceInfo> {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        if (!workspace) {
            throw new UnauthorizedException();
        }

        const user = await this.getCurrentUserAsync(request);
        return {
            workspaceId: workspace._id.toString(),
            name: workspace.name,
            roles: await this.authService.getUserRolesForWorkspaceAsync(user._id, workspace._id),
        };
    }

    @HttpCode(200)
    @Post('gateway/authorize')
    @UseGuards(LocalGatewayAuthGuard)
    authorizeGateway(@Req() request: UserRequest<void>): { token: string } {
        return { token: this.authService.generateToken(request.user) };
    }
}
