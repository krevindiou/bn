import { Inject, Injectable } from '@nestjs/common';
import { MASSIVE_CONNECTION } from '@nestjsplus/massive';
import camelcaseKeys from 'camelcase-keys';
import { plainToClass } from 'class-transformer';
import * as crypto from 'crypto';
import { Credentials } from './model/credentials';
import { Member } from './model/member';

@Injectable()
export class MemberRepository {
    constructor(@Inject(MASSIVE_CONNECTION) private readonly db: any) {} // eslint-disable-line @typescript-eslint/no-explicit-any

    public async findByCredentials(credentials: Credentials): Promise<Member> {
        const hashedPassword = crypto
            .createHash('md5')
            .update(credentials.password.value)
            .digest('hex');

        let member = await this.db.member.findOne({
            email: credentials.email.value,
            password: hashedPassword,
            deleted_at: null, // eslint-disable-line @typescript-eslint/camelcase
        });

        if (member === null) {
            throw new Error('Member not found');
        }

        member = plainToClass(Member, camelcaseKeys(member));

        return member;
    }

    public async getAll(): Promise<Member[]> {
        let members = await this.db.member.find(
            {},
            {
                order: [{ field: 'name', direction: 'ASC' }],
            },
        );

        members = plainToClass(Member, camelcaseKeys(members, { deep: true }));

        return members;
    }
}
