import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import AuthConfig from '../config/auth.config';
import MemberModule from '../member/member.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        ConfigModule.forFeature(AuthConfig),
        MemberModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(AuthConfig)],
            useFactory: async (config: ConfigType<typeof AuthConfig>) => {
                return {
                    secret: config.secret,
                    signOptions: { expiresIn: '7d' },
                };
            },
            inject: [AuthConfig.KEY],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export default class AuthModule {}
