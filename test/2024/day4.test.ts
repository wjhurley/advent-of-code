import {
    Day4Part1,
    Day4Part2,
} from '../../src/2024/day4';

describe('day4 tests', () => {
    describe('day4Part1 tests', () => {
        it('Should return the correct occurrences of XMAS in word search', () => {
            const testString = 'XMAS\nMMMM\nAAAA\nSSSS';
            const day4Part1 = new Day4Part1(testString);
            expect(day4Part1.wordCount).toBe(3);
        });

        it('Should return 0 when no occurrences of XMAS are found in word search', () => {
            const testString = 'XMMS\nXMMM\nAASA\nSSSS';
            const day4Part1 = new Day4Part1(testString);
            expect(day4Part1.wordCount).toBe(0);
        });
    });

    describe('day4Part2 tests', () => {
        it('Should return the correct occurrences of X-MAS in word search', () => {
            const testString = 'MMS\nAAM\nMXS';
            const day4Part2 = new Day4Part2(testString);
            expect(day4Part2.wordCount).toBe(1);
        });

        it('Should return 0 when no occurrences of X-MAS are found in word search', () => {
            const testString = 'XMM\nXMM\nAAS\nSSS';
            const day4Part2 = new Day4Part2(testString);
            expect(day4Part2.wordCount).toBe(0);
        });
    });
});
