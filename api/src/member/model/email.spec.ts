import { Email } from './email';

describe('Email', () => {
    it('should succeed', () => {
        expect(() => ( new Email('john@example.net') )).not.toThrow();
    });

    it('should fail', () => {
        expect(() => ( new Email('johnexample.net') )).toThrow(Error);
        expect(() => ( new Email('') )).toThrow(Error);
    });
});
