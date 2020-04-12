import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AuthConfig from '../../config/auth.config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AuthConfig.KEY)
        config: ConfigType<typeof AuthConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async validate(payload: { sub: string; email: string }): Promise<object> {
        return { memberId: payload.sub, email: payload.email };
    }
}
