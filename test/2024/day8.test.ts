import {
    Day8Part1,
    Day8Part2,
} from '../../src/2024/day8';

describe('day8 tests', () => {
    const testInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim();

    describe('Day8Part1 tests', () => {
        it('Should return the number of antiNodes in a given map', () => {
            const day8Part1 = new Day8Part1(testInput);
            expect(day8Part1.antiNodes).toBe(14);
        });
    });

    describe('Day8Part2 tests', () => {
        it('Should return the number of antiNodes in a given map', () => {
            const day8Part2 = new Day8Part2(testInput);
            expect(day8Part2.antiNodes).toBe(34);
        });
    });
});