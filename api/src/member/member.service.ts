import { Injectable } from '@nestjs/common';
import MemberRepository from './member.repository';
import { Member } from './model/member';

@Injectable()
export default class MemberService {
    constructor(
        private readonly memberRepository: MemberRepository,
    ) {}

    async get(id: string): Promise<Member> {
        const member = await this.memberRepository.findById(id);
        if (member === null) {
            throw new Error('Member not found');
        }

        return member;
    }

    public async getAll(): Promise<Member[]> {
        return this.memberRepository.getAll();
    }
}
