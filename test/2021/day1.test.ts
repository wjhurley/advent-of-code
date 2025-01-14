import {
    day1Part1,
    day1Part2,
} from '../../src/2021/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the number of times a depth measurement increases from the previous one', () => {
            expect(day1Part1('199\n200\n208\n210\n200\n207\n240\n269\n260\n263')).toBe(7);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the number of times a depth measurement increases from the previous one', () => {
            expect(day1Part2('199\n200\n208\n210\n200\n207\n240\n269\n260\n263')).toBe(5);
        });
    });
});
