import { day1Part1 } from 'src/2025/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the correct password', () => {
            const testInput = 'L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82';
            expect(day1Part1(testInput)).toBe(3);
        });
    });
});
