import {
    day1Part1,
    day1Part2,
} from '../../src/2022/day1';

describe('day1 tests', () => {
    const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    describe('day1Part1 tests', () => {
        it('Should return the total calories for the elf carrying the most calories', () => {
            expect(day1Part1(testInput)).toBe(24000);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the total combined calories for the three elves carrying the most calories', () => {
            expect(day1Part2(testInput)).toBe(45000);
        });
    });
});
