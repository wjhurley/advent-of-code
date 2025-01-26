import {
    day4Part1,
    day4Part2,
} from '../../src/2015/day4';

describe('day4 tests', () => {
    describe('day4Part1 tests', () => {
        it('Should return the lowest positive number that produces an MD5 hash with 5 leading zeroes 1', () => {
            const testInput = 'abcdef';
            expect(day4Part1(testInput)).toBe(609043);
        });

        it('Should return the lowest positive number that produces an MD5 hash with 5 leading zeroes 2', () => {
            const testInput = 'pqrstuv';
            expect(day4Part1(testInput)).toBe(1048970);
        });
    });

    describe('day4Part2 tests', () => {
        it('Should return the lowest positive number that produces an MD5 hash with 5 leading zeroes 1', () => {
            const testInput = 'abcdef';
            expect(day4Part2(testInput)).toBe(6742839);
        });
    });
});
