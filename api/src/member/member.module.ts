import { Logger, Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

@Module({
    providers: [Logger, MemberService, MemberRepository],
    controllers: [MemberController],
    imports: [],
    exports: [Logger, MemberService],
})
export class MemberModule {}
