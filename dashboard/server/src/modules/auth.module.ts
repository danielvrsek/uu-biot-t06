import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthConstants } from 'auth/common/authConstants';
import { UserModule } from './user.module';
import { LocalStrategy } from 'auth/strategies/local.strategy';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { AuthService } from 'services/auth.service';
import { AuthController } from 'controllers/auth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: AuthConstants.JwtSecret,
            signOptions: { expiresIn: '240s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy /*{ provide: APP_GUARD, useClass: JwtAuthGuard }*/],
    exports: [AuthService],
})
export class AuthModule {}
