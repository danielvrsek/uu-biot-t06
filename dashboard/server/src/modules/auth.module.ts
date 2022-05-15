import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthConstants } from 'auth/common/authConstants';
import { UserModule } from './user.module';
import { LocalUserStrategy } from 'auth/strategies/localUser.strategy';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { AuthService } from 'services/auth.service';
import { AuthController } from 'controllers/auth.controller';
import { GatewayModule } from './gateway.module';
import { LocalGatewayStrategy } from 'auth/strategies/localGateway.strategy';

@Module({
    imports: [
        UserModule,
        GatewayModule,
        PassportModule,
        JwtModule.register({
            secret: AuthConstants.JwtSecret,
            signOptions: { expiresIn: '240s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalUserStrategy, LocalGatewayStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
