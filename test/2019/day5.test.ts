import { day5Part1 } from '../../src/2019/day5';

describe('day5 tests', () => {
    describe('day5Part1 tests', () => {
        it('Should return the correct value for position 0 using the "1202 program alarm"', () => {
            expect(day5Part1(1)).toBe(13210611);
        });
    });
});
