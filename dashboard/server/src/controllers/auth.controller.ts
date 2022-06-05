import { Controller, Req, Post, UseGuards, Res, Get, HttpCode } from '@nestjs/common';
import { TokenType } from 'auth/common/tokenType';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { LocalGatewayAuthGuard } from 'auth/guards/local-gateway.guard';
import { LocalUserAuthGuard } from 'auth/guards/local-user.guard';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { Cookies } from 'common/cookies';
import { UserRequest } from 'common/request';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { Response } from 'express';
import { AuthService } from 'services/auth.service';
import { UserInfo, WorkspaceUserInfo } from 'services/dto/user.dto';
import { CookieHelper } from 'utils/cookieHelper';
import { ControllerBase } from './controllerBase';
import { Types } from 'mongoose';
import { objectId } from 'utils/schemaHelper';

@Controller('auth')
export class AuthController extends ControllerBase {
    constructor(
        private authService: AuthService,
        cookieHelper: CookieHelper,
        workspaceRepository: WorkspaceRepository
    ) {
        super(cookieHelper, workspaceRepository);
    }

    @Post('login')
    @UseGuards(LocalUserAuthGuard)
    async loginAsync(@Req() request: UserRequest<void>, @Res({ passthrough: true }) response: Response): Promise<void> {
        const token = this.authService.generateToken(request.user);

        response.cookie(Cookies.AuthCookie, token, {
            httpOnly: true,
            sameSite: 'none',
        });
        response.status(200);
        //response.json(await this.getWorkspaceUserInfoAsync(request.user, workspace._id));
        response.end();
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
    async getUserInfoAsync(@Req() request: UserRequest<void>) {
        const workspace = await this.getCurrentWorkspaceAsync(request);
        return await this.getWorkspaceUserInfoAsync(request.user, workspace._id);
    }

    @HttpCode(200)
    @Post('gateway/authorize')
    @UseGuards(LocalGatewayAuthGuard)
    authorizeGateway(@Req() request: UserRequest<void>): { token: string } {
        return { token: this.authService.generateToken(request.user) };
    }

    async getWorkspaceUserInfoAsync(user: UserInfo, workspaceId: Types.ObjectId): Promise<WorkspaceUserInfo> {
        return {
            ...user,
            roles: await this.authService.getUserRolesForWorkspaceAsync(objectId(user.userId), workspaceId),
        };
    }
}
