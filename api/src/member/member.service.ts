import { Injectable, Logger } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Credentials } from './model/credentials';
import { Member } from './model/member';

@Injectable()
export class MemberService {
    constructor(
        private readonly logger: Logger,
        private readonly memberRepository: MemberRepository,
    ) {}

    public async login(credentials: Credentials): Promise<Member | undefined> {
        try {
            return await this.memberRepository.findByCredentials(credentials);
        } catch (error) {
            this.logger.log('Unable to login', error);
        }
    }
    }
}
