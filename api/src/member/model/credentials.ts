import { Email } from './email';
import { Password } from './password';

export class Credentials {
    constructor(public readonly email: Email, public readonly password: Password) {}
}
