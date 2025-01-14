import {
    day1Part1,
    day1Part2,
} from '../../src/2019/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the fuel required to launch a given module 1', () => {
            expect(day1Part1('12')).toBe(2);
        });

        it('Should return the fuel required to launch a given module 2', () => {
            expect(day1Part1('14')).toBe(2);
        });

        it('Should return the fuel required to launch a given module 3', () => {
            expect(day1Part1('1969')).toBe(654);
        });

        it('Should return the fuel required to launch a given module 4', () => {
            expect(day1Part1('100756')).toBe(33583);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the fuel required to launch a given module, including fuel 1', () => {
            expect(day1Part2('14')).toBe(2);
        });

        it('Should return the fuel required to launch a given module, including fuel 2', () => {
            expect(day1Part2('1969')).toBe(966);
        });

        it('Should return the fuel required to launch a given module, including fuel 3', () => {
            expect(day1Part2('100756')).toBe(50346);
        });
    });
});
