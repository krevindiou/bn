import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../member/model/member';
import MemberRepository from '../member/member.repository';

@Injectable()
export default class AuthService {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private readonly memberRepository: MemberRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string): Promise<Member | null> {
        return this.memberRepository.findByCredentials(email, password);
    }

    async getToken(member: Member): Promise<string> {
        const payload = { email: member.email, sub: member.memberId };

        return this.jwtService.sign(payload);
    }
}
