import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthConstants } from 'auth/common/authConstants';
import { UsersModule } from './users.module';
import { LocalStrategy } from 'auth/strategies/local.strategy';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { AuthService } from 'services/auth.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: AuthConstants.JwtSecret,
            signOptions: { expiresIn: '240s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
    exports: [AuthService],
})
export class AuthModule {}
