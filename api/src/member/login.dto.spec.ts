import { validateSync } from 'class-validator';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
    it('should succeed', () => {
        expect(validateSync(new LoginDto('john@example.net', 'password123')).length).toBe(0);
        expect(validateSync(new LoginDto('john@example.net', 'password1234')).length).toBe(0);
        expect(validateSync(new LoginDto('john@example.com', 'password123')).length).toBe(0);
    });

    it('should fail', () => {
        expect(validateSync(new LoginDto('john@example.net', '')).length).toBe(1);
        expect(validateSync(new LoginDto('', 'password123')).length).toBe(1);
        expect(validateSync(new LoginDto('johnexample.net', 'password123')).length).toBe(1);
    });
});
