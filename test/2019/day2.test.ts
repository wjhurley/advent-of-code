import {
    day2Part1,
    day2Part2,
} from '../../src/2019/day2';

describe('day2 tests', () => {
    describe('day2Part1 tests', () => {
        it('Should return the correct value for position 0 using the "1202 program alarm"', () => {
            expect(day2Part1(12, 2)).toBe(5098658);
        });
    });

    describe('Day2Part2 tests', () => {
        it('Should return the correct value for position 0 using the provided value', () => {
            expect(day2Part2(19690720)).toBe(5064);
        });

        it('Should return 0 if the provided value cannot be found at position 0', () => {
            expect(day2Part2(100)).toBe(0);
        });
    });
});
