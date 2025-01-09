import {
    day12Part1,
    day12Part2,
} from '../../src/2024/day12';

describe('day12 tests', () => {
    const testInput = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`.trim();

    describe('day12Part1 tests', () => {
        it('Should return the total price to fence all regions in a given map', () => {
            expect(day12Part1(testInput)).toBe(1930);
        });
    });

    describe('day12Part2 tests', () => {
        it('Should return the total price to fence all regions in a given map', () => {
            expect(day12Part2(testInput)).toBe(1206);
        });
    });
});
