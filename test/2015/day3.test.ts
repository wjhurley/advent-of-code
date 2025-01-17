import {
    day3Part1,
    day3Part2,
} from '../../src/2015/day3';

describe('day3 tests', () => {
    describe('day3Part1 tests', () => {
        it('Should return the correct number of houses visited by Santa', () => {
            const testInput = '^>v<';
            expect(day3Part1(testInput)).toBe(4);
        });
    });

    describe('day3Part2 tests', () => {
        it('Should return the correct number of houses visited by Santa and Robo-Santa', () => {
            const testInput = '^>v<';
            expect(day3Part2(testInput)).toBe(3);
        });
    });
});
