import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Credentials } from './model/credentials';
import { Member } from './model/member';

@Injectable()
export class MemberService {
    constructor(
        private readonly memberRepository: MemberRepository,
    ) {}

    public async login(credentials: Credentials): Promise<Member | undefined> {
        return await this.memberRepository.findByCredentials(credentials);
    }
}
