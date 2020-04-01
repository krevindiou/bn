import { Inject, Injectable } from '@nestjs/common';
import { MASSIVE_CONNECTION } from '@nestjsplus/massive';
import camelcaseKeys from 'camelcase-keys';
import { plainToClass } from 'class-transformer';
import * as crypto from 'crypto';
import { Member } from './model/member';

@Injectable()
export default class MemberRepository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(@Inject(MASSIVE_CONNECTION) private readonly db: any) {}

    async findByCredentials(email: string, password: string): Promise<Member | null> {
        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

        const result = await this.db.member.findOne({
            email,
            password: hashedPassword,
            deleted_at: null, // eslint-disable-line @typescript-eslint/camelcase
        });
        if (result === null) {
            return null;
        }

        return plainToClass(Member, camelcaseKeys(result));
    }

    async findById(id: string): Promise<Member | null> {
        const result = await this.db.member.findOne({member_id: id}); // eslint-disable-line @typescript-eslint/camelcase
        if (result === null) {
            return null;
        }

        return plainToClass(Member, camelcaseKeys(result));
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
