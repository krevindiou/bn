import { Module } from '@nestjs/common';
import { MassiveModule, MassiveConnectOptions } from '@nestjsplus/massive';
import { ConfigModule, ConfigType } from '@nestjs/config';
import AppController from './app.controller';
import AuthModule from './auth/auth.module';
import MemberModule from './member/member.module';
import DatabaseConfig from './config/database.config';

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot(),
        MassiveModule.registerAsync({
            imports: [ConfigModule.forFeature(DatabaseConfig)],
            useFactory: async (config: ConfigType<typeof DatabaseConfig>) =>
                config as MassiveConnectOptions,
            inject: [DatabaseConfig.KEY],
        }),
        AuthModule,
        MemberModule,
    ],
})
export default class AppModule {}
