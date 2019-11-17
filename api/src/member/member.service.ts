import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Credentials } from './model/credentials';

@Injectable()
export class MemberService {
    constructor(
        private readonly memberRepository: MemberRepository,
    ) {}

    public login(credentials: Credentials): boolean {
        return this.memberRepository.login(credentials);
    }
}
