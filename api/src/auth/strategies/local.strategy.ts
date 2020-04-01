import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from '../auth.service';
import { Member } from '../../member/model/member';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<Member> {
        const member = await this.authService.login(username, password);
        if (member === null) {
            throw new UnauthorizedException();
        }

        return member;
    }
}
