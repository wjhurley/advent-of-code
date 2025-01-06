import { day11Part1 } from '../../src/2024/day11';

describe('day11 tests', () => {
    describe('day11Part1 tests', () => {
        it('Should return the correct number of stones after processing', () => {
            const testInput = '125 17';
            expect(day11Part1(testInput, 25)).toBe(55312);
        });
    });
});