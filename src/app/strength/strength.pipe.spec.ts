import {StrengthPipe} from './strength.pipe';

describe('Strength pipe', () => {
    let strength: StrengthPipe;

    beforeEach(() => {
        strength = new StrengthPipe();
    });

    it('should display weak is strength is inferior to 10', () => {
        let result = strength.transform(5);

        expect(result).toContain('weak');
    });

    it('should display strong is strength is 10', () => {
        let result = strength.transform(10);

        expect(result).toContain('strong');
    });

    it('should display unbelievable is strength is > 20', () => {
        let result = strength.transform(50);

        expect(result).toContain('unbelievable');
    });
});