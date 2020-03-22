import { Password } from './password';

describe('Password', () => {
    it('should succeed', () => {
        expect(() => new Password('password123')).not.toThrow();
    });

    it('should fail', () => {
        expect(() => new Password('')).toThrow(Error);
    });
});
