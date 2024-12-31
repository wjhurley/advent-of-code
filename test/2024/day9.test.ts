import {
    Day9Part1,
} from '../../src/2024/day9';

describe('day9 tests', () => {
    describe('Day9Part1 tests', () => {
        it('Should return the correct checksum for a given diskMap', () => {
            const testInput = '2333133121414131402';
            const day9Part1 = new Day9Part1(testInput);
            expect(day9Part1.checkSum).toBe(1928);
        });

        it('Should return the correct checksum for a larger diskMap', () => {
            const testInput = '9371657678826024995120881287893479';
            const day9Part1 = new Day9Part1(testInput);
            expect(day9Part1.checkSum).toBe(44861);
        });
    });
});