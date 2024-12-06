import {
    day1Part1,
    day1Part2,
} from '../../src/2024/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should find the difference between two numbers passed as a single-line string', () => {
            const testString = '14567   85100';
            expect(day1Part1(testString)).toBe(70533);
        });

        it('Should find the difference between two lists of numbers passed as a string', () => {
            const testString = `27636   67663\n92436   51410\n68957   77912`;
            expect(day1Part1(testString)).toBe(39592);
        });
    });

    describe('day1Part2 tests', () => {
        it('Should return the total of multiplying all left list values against the occurrences in the right list', () => {
            const testString = '14567   85100\n20000   14567\n30000   14567\n40000   14567';
            expect(day1Part2(testString)).toBe(43701);
        });
    });
});
