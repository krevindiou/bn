import { Module } from '@nestjs/common';
import MemberController from './member.controller';
import MemberRepository from './member.repository';
import MemberService from './member.service';

@Module({
    providers: [MemberService, MemberRepository],
    controllers: [MemberController],
    imports: [],
    exports: [MemberService, MemberRepository],
})
export default class MemberModule {}
