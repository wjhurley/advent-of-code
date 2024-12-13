import {
    day1Part1,
    day1Part2,
} from '../../src/2015/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the correct floor', () => {
            const testInput = '))(((((';
            expect(day1Part1(testInput)).toBe(3);
        });

        it('Should throw an error when provided with invalid input', () => {
            const testInput = '))((1(((';
            expect(() => day1Part1(testInput)).toThrow();
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the correct position when first entering the basement', () => {
            const testInput = '(())))(';
            expect(day1Part2(testInput)).toBe(5);
        });

        it('Should throw an error when provided with invalid input', () => {
            const testInput = '((1))(((';
            expect(() => day1Part2(testInput)).toThrow();
        });

        it('Should throw an error for an empty input', () => {
            expect(() => day1Part2('')).toThrow();
        });
    });
});
