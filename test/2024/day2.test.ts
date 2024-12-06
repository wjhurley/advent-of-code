import {
    day2Part1,
    day2Part2,
} from '../../src/2024/day2';

describe('day2 tests', () => {
    describe('day2Part1 tests', () => {
        it('Should return 1 with a single set of numbers in ascending order incremented by 1', () => {
            const testString = '1 2 3 4 5 6';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 1', () => {
            const testString = '6 5 4 3 2 1';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in ascending order incremented by 2', () => {
            const testString = '1 3 5 7 9 11';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 2', () => {
            const testString = '11 9 7 5 3 1';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in ascending order incremented by 3', () => {
            const testString = '1 4 7 10 13 16';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 3', () => {
            const testString = '16 13 10 7 4 1';
            expect(day2Part1(testString)).toBe(1);
        });

        it('Should return 0 with a single set of numbers in ascending order incremented by 4', () => {
            const testString = '1 5 9 13 17 21';
            expect(day2Part1(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers in neither descending or ascending order', () => {
            const testString = '3 2 1 6 5 4';
            expect(day2Part1(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers in ascending order with a duplicate', () => {
            const testString = '1 3 3 5 7 9';
            expect(day2Part1(testString)).toBe(0);
        });
    });

    describe('day2Part2 tests', () => {
        it('Should return 1 with a single set of numbers in ascending order incremented by 1', () => {
            const testString = '1 2 3 4 5 6';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 1', () => {
            const testString = '6 5 4 3 2 1';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in ascending order incremented by 2', () => {
            const testString = '1 3 5 7 9 11';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 2', () => {
            const testString = '11 9 7 5 3 1';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in ascending order incremented by 3', () => {
            const testString = '1 4 7 10 13 16';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order decremented by 3', () => {
            const testString = '16 13 10 7 4 1';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in descending order, except for the last number', () => {
            const testString = '16 13 10 7 4 6';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers in ascending order, except for the first number', () => {
            const testString = '9 1 2 3 4 5';
            expect(day2Part2(testString)).toBe(1);
        });

        it('Should return 1 with a single set of numbers with one failing number in the middle', () => {
            const testString = '5 4 8 9 10 11';
            expect(day2Part2(testString)).toBe(1);
        })

        it('Should return 0 with a single set of numbers in ascending order incremented by 4', () => {
            const testString = '1 5 9 13 17 21';
            expect(day2Part2(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers in neither descending or ascending order', () => {
            const testString = '3 2 1 6 5 4';
            expect(day2Part2(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers in ascending order with two duplicates', () => {
            const testString = '1 1 3 3 5 7';
            expect(day2Part2(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers with two descending sets of numbers', () => {
            const testString = '4 3 6 5 4 3';
            expect(day2Part2(testString)).toBe(0);
        });

        it('Should return 0 with a single set of numbers with one not sorted and increment greater than 4', () => {
            const testString = '1 3 2 7 8 9';
            expect(day2Part2(testString)).toBe(0);
        });
    });
});
