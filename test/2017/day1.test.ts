import {
    day1Part1,
    day1Part2,
} from '../../src/2017/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the sum of all numbers that match the next number in the list', () => {
            expect(day1Part1('1122')).toBe(3);
        });

        it('Should return the sum of all numbers when all numbers are the same', () => {
            expect(day1Part1('1111')).toBe(4);
        });

        it('Should return the sum of all numbers when none of the numbers are the same', () => {
            expect(day1Part1('1234')).toBe(0);
        });

        it('Should return the sum of all numbers with a larger set of numbers', () => {
            expect(day1Part1('91212129')).toBe(9);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the sum of all numbers that match the next number in the list 1', () => {
            expect(day1Part2('1212')).toBe(6);
        });

        it('Should return the sum of all numbers that match the next number in the list 2', () => {
            expect(day1Part2('1221')).toBe(0);
        });

        it('Should return the sum of all numbers that match the next number in the list 3', () => {
            expect(day1Part2('123425')).toBe(4);
        });

        it('Should return the sum of all numbers that match the next number in the list 4', () => {
            expect(day1Part2('123123')).toBe(12);
        });

        it('Should return the sum of all numbers that match the next number in the list 5', () => {
            expect(day1Part2('12131415')).toBe(4);
        });
    });
});
