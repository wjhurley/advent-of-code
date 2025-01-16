import {
    day2Part1,
    day2Part2,
} from '../../src/2015/day2';

describe('day2 tests', () => {
    describe('day2Part1 tests', () => {
        it('Should return the correct amount of wrapping paper in square feet', () => {
            const testInput = '2x3x4';
            expect(day2Part1(testInput)).toBe(58);
        });
    });

    describe('day2Part2 tests', () => {
        it('Should return the correct length of ribbon needed in feet', () => {
            const testInput = '2x3x4';
            expect(day2Part2(testInput)).toBe(34);
        });
    });
});
