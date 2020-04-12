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
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_NAME: Joi.string().required(),
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
