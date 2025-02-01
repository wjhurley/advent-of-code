import {
    day2Part1,
    day2Part2,
} from '../../src/2019/day2';

describe('day2 tests', () => {
    describe('day2Part1 tests', () => {
        it('Should return the correct value for position 0 using the "1202 program alarm"', () => {
            expect(day2Part1('1,0,0,0,99', 0, 0)).toBe(2);
        });
    });

    describe('Day2Part2 tests', () => {
        it('Should return the correct value for position 0 using the provided value', () => {
            expect(day2Part2('1,0,0,0,99', 2)).toBe(0);
        });

        it('Should return 0 if the provided value cannot be found at position 0', () => {
            expect(day2Part2('2,0,0,0,99', 200)).toBe(0);
        });
    });
});
