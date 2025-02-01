import { day5Part1 } from '../../src/2019/day5';

describe('day5 tests', () => {
    describe('day5Part1 tests', () => {
        it('Should return the correct output value for the diagnostic program and input provided', () => {
            expect(day5Part1('3,7,1,0,0,0,104,-1,99', 1)).toBe(1);
        });

        it('Should throw an error because no output value is found', () => {
            expect(() => day5Part1('1002,4,3,4,33', 1)).toThrow();
        });
    });
});
