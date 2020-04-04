import { Injectable } from '@nestjs/common';
import MemberRepository from './member.repository';
import { Member, updateMemberFromDto } from './model/member';
import UpdateMemberDto from './dto/update-member.dto';

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

    async getAll(): Promise<Member[]> {
        return this.memberRepository.findAll();
    }

    async update(id: string, dto: UpdateMemberDto): Promise<Member> {
        const member = updateMemberFromDto(await this.get(id), dto);

        return this.memberRepository.update(member);
    }
}
