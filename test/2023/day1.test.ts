import {
    day1Part1,
    day1Part2,
} from '../../src/2023/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the sum after combining the first and last digits from each line', () => {
            const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
            expect(day1Part1(testInput)).toBe(142);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the sum when there are spelled out numbers', () => {
            const testInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
            expect(day1Part2(testInput)).toBe(281);
        });

        it('Should return the sum when there are no spelled out numbers', () => {
            const testInput = `two1nine
eightwothree
abcone2threexyz
xtw2ne34our
4nineeightseven2
zoneight234
7pqrstsixteen`;
            expect(day1Part2(testInput)).toBe(281);
        });
    });
});
