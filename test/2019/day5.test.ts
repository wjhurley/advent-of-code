import { day5Part1 } from '../../src/2019/day5';

describe('day5 tests', () => {
    describe('day5Part1 tests', () => {
        it('Should return the correct immediate-mode output value for the diagnostic program and input provided', () => {
            expect(day5Part1('3,11,1,0,0,0,101,5,0,0,104,-1,99', 1)).toBe(1);
        });

        it('Should return the correct position-mode output value for the diagnostic program and input provided', () => {
            expect(day5Part1('3,11,1,0,0,0,101,5,0,0,4,-1,99', 1)).toBe(11);
        });

        it('Should throw an error because no output value is found', () => {
            expect(() => day5Part1('1002,4,3,4,33', 1)).toThrow();
        });

        it('Should throw an error if an invalid opCode exists in the diagnostic program', () => {
            expect(() => day5Part1('1005,4,3,4,33', 1)).toThrow();
        });
    });
});
