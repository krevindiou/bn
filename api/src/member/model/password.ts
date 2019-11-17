import { Validator } from 'class-validator';

export class Password {
    public readonly value: string;

    constructor(value: string) {
        const validator = new Validator();

        if (!validator.isNotEmpty(value)) {
            throw new Error('Password is invalid');
        }

        this.value = value;
    }
}
