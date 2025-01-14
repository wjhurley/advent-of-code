import {
    day1Part1,
    day1Part2,
} from '../../src/2020/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the outcome of multiplying the two values that sum to 2020', () => {
            expect(day1Part1('1721\n979\n366\n299\n675\n1456')).toBe(514579);
        });

        it('Should throw an error if no two numbers sum up to 2020', () => {
            expect(() => day1Part1('1721\n979\n366')).toThrow();
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the outcome of multiplying the three values that sum to 2020', () => {
            expect(day1Part2('1721\n979\n366\n299\n675\n1456')).toBe(241861950);
        });

        it('Should throw an error if no three numbers sum up to 2020', () => {
            expect(() => day1Part2('1721\n979\n366')).toThrow();
        });
    });
});
