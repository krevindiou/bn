import { Inject, Injectable } from '@nestjs/common';
import { MASSIVE_CONNECTION } from '@nestjsplus/massive';
import { Credentials } from './model/credentials';
import { Member } from './model/member';

@Injectable()
export class MemberRepository {
    constructor(@Inject(MASSIVE_CONNECTION) private readonly db: any) {}

    public async login(credentials: Credentials): Promise<Member | undefined> {
        return credentials.email.value === 'john@example.net' && credentials.password.value === 'password123';
    }
}
