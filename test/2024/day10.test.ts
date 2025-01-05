import {
    Day10Part1,
    Day10Part2,
    makeUniqueArray,
} from '../../src/2024/day10';

describe('day10 tests', () => {
    describe('day10Part1 tests', () => {
        it('Should return the total score for all trailheads', () => {
            const testInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`.trim();
            const day10Part1 = new Day10Part1(testInput);
            expect(day10Part1.scores).toBe(36);
        });

        it('Should return the total score for all trailheads with an orphaned trailhead', () => {
            const testInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456702`.trim();
            const day10Part1 = new Day10Part1(testInput);
            expect(day10Part1.scores).toBe(36);
        });
    });

    describe('day10Part2 tests', () => {
        it('Should return the total score for all trailheads', () => {
            const testInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`.trim();
            const day10Part2 = new Day10Part2(testInput);
            expect(day10Part2.scores).toBe(81);
        });

        it('Should return the total score for all trailheads with an orphaned trailhead', () => {
            const testInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456702`.trim();
            const day10Part2 = new Day10Part2(testInput);
            expect(day10Part2.scores).toBe(81);
        });
    });

    describe('makeUniqueArray tests', () => {
        it('Should return a unique array from an array of duplicates', () => {
            expect(makeUniqueArray([ 1, 2, 3, 3, 4 ])).toEqual([ 1, 2, 3, 4 ]);
        });

        it('Should return a unique array from an array of nested duplicates', () => {
            expect(makeUniqueArray([ [ 1 ], [ 2] , [ 3 ], [ 3 ], [ 4 ] ])).toEqual([ [ 1 ], [ 2] , [ 3 ], [ 4 ] ]);
        });

        it('Should return a unique array from an array of duplicates', () => {
            expect(() => makeUniqueArray([ { foo: 'bar' }, { foo: 'bar' } ])).toThrow();
        });
    });
});