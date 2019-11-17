import { Validator } from 'class-validator';

export class Email {
    public readonly value: string;

    constructor(value: string) {
        const validator = new Validator();

        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid');
        }

        this.value = value;
    }
}
