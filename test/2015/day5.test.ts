import { day5Part1 } from '../../src/2015/day5';

describe('day5 tests', () => {
    describe('day5Part1 tests', () => {
        it('Should return 1 for a "nice" string 1', () => {
            const testInput = 'ugknbfddgicrmopn';
            expect(day5Part1(testInput)).toBe(1);
        });

        it('Should return 1 for a "nice" string 2', () => {
            const testInput = 'aaa';
            expect(day5Part1(testInput)).toBe(1);
        });

        it('Should return 0 for a "naughty" string 1', () => {
            const testInput = 'jchzalrnumimnmhp';
            expect(day5Part1(testInput)).toBe(0);
        });

        it('Should return 0 for a "naughty" string 2', () => {
            const testInput = 'haegwjzuvuyypxyu';
            expect(day5Part1(testInput)).toBe(0);
        });

        it('Should return 0 for a "naughty" string 3', () => {
            const testInput = 'dvszwmarrgswjxmb';
            expect(day5Part1(testInput)).toBe(0);
        });

        it('Should return 9 for a "naughty" string 4', () => {
            const testInput = 'fkgrqbyqpqcwrqc';
            expect(day5Part1(testInput)).toBe(0);
        })
    });
});
