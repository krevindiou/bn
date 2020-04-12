import { Module } from '@nestjs/common';
import { MassiveModule, MassiveConnectOptions } from '@nestjsplus/massive';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import AppController from './app.controller';
import AuthModule from './auth/auth.module';
import MemberModule from './member/member.module';
import DatabaseConfig from './config/database.config';

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET_KEY: Joi.string().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().default(5432),
                POSTGRES_DB: Joi.string().required(),
            }),
        }),
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
