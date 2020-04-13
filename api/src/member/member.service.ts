import { Injectable } from '@nestjs/common';

import CreateMemberDto from './dto/create-member.dto';
import UpdateMemberDto from './dto/update-member.dto';
import MemberRepository from './member.repository';
import { createMemberFromDto, Member, updateMemberFromDto } from './model/member';

@Injectable()
export default class MemberService {
    // eslint-disable-next-line no-useless-constructor
    constructor(private readonly memberRepository: MemberRepository) {}

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

    async register(dto: CreateMemberDto): Promise<Member> {
        return this.memberRepository.add(createMemberFromDto(dto));
    }

    async update(id: string, dto: UpdateMemberDto): Promise<Member> {
        const member = updateMemberFromDto(await this.get(id), dto);

        return this.memberRepository.update(member);
    }
}
