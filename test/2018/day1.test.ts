import {
    day1Part1,
    day1Part2,
} from '../../src/2018/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the resulting frequency when applying all changes 1', () => {
            expect(day1Part1('+1\n+1\n+1')).toBe(3);
        });

        it('Should return the resulting frequency when applying all changes 2', () => {
            expect(day1Part1('+1\n+1\n-2')).toBe(0);
        });

        it('Should return the resulting frequency when applying all changes 3', () => {
            expect(day1Part1('-1\n-2\n-3')).toBe(-6);
        });

        it('Should throw an error for an unsupported operator', () => {
            expect(() => day1Part1('-1\n-2\n*3')).toThrow();
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the first frequency encountered twice when repeating all changes 1', () => {
            expect(day1Part2('+1\n-1')).toBe(0);
        });

        it('Should return the first frequency encountered twice when repeating all changes 2', () => {
            expect(day1Part2('+3\n+3\n+4\n-2\n-4')).toBe(10);
        });

        it('Should return the first frequency encountered twice when repeating all changes 3', () => {
            expect(day1Part2('-6\n+3\n+8\n+5\n-6')).toBe(5);
        });

        it('Should return the first frequency encountered twice when repeating all changes 4', () => {
            expect(day1Part2('+7\n+7\n-2\n-7\n-4')).toBe(14);
        });

        it('Should throw an error for an unsupported operator', () => {
            expect(() => day1Part2('-1\n-2\n*3')).toThrow();
        });
    });
});
