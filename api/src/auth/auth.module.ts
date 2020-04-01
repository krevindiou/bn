import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import LocalStrategy from './strategies/local.strategy';
import JwtStrategy from './strategies/jwt.strategy';
import MemberModule from '../member/member.module';

@Module({
    controllers: [AuthController],
    imports: [
        ConfigModule.forRoot(),
        MemberModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export default class AuthModule {}
