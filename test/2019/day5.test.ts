import {
    day5Part1,
    day5Part2,
} from '../../src/2019/day5';

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

    describe('day5Part2 tests', () => {
        const testInput = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';

        it('Should return the correct output value for the diagnostic program and input provided 1', () => {
            expect(day5Part2('3,13,1,0,0,0,8,13,14,13,4,13,99,-1,8', 8)).toBe(1);
        });

        it('Should return the correct output value for the diagnostic program and input provided 2', () => {
            expect(day5Part2(testInput, 7)).toBe(999);
        })

        it('Should return the correct output value for the diagnostic program and input provided 3', () => {
            expect(day5Part2(testInput, 8)).toBe(1000);
        })

        it('Should return the correct output value for the diagnostic program and input provided 4', () => {
            expect(day5Part2(testInput, 9)).toBe(1001);
        })

        it('Should throw an error because no non-zero output value is found', () => {
            expect(() => day5Part2('3,9,7,9,10,9,4,9,99,-1,8', 8)).toThrow();
        });

        it('Should throw an error if an invalid opCode exists in the diagnostic program', () => {
            expect(() => day5Part2('5,1,5,100,4,3,4,33', 1)).toThrow();
        });
    });
});
