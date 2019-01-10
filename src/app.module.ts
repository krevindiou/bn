import { Module } from '@nestjs/common';
import { MassiveModule } from '@nestjsplus/massive';
import { AppController } from './app.controller';
import { MemberModule } from './member/member.module';

@Module({
    controllers: [AppController],
    imports: [
        MassiveModule.register(
            {
                user: 'bn',
                password: '5Kn317rj1RJrVDaV',
                host: 'postgresql',
                port: 5432,
                database: 'bn',
            },
        ),
        MemberModule,
    ],
})

export class AppModule {}
