import {
    Day6Part1,
} from '../../src/2024/day6';

describe('day6 tests', () => {
    describe('day6Part1 tests', () => {
        it('Should return the number of positions in the guard\'s patrol path', () => {
            const testInput = `
....#.....
.........#
..........
..#.......
.#.....#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(41);
        });

        it('Should correctly return the number of positions when exiting to the right', () => {
            const testInput = `
....#.....
..........
..........
..#.......
.#.....#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(11);
        });

        it('Should correctly return the number of positions when exiting to the top', () => {
            const testInput = `
....#.....
.........#
..........
..........
.#.....#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(26);
        });

        it('Should correctly return the number of positions when exiting to the left', () => {
            const testInput = `
....#.....
.........#
..........
..#.......
.#.....#..
..........
....^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(22);
        });

        it('Should correctly return the number of positions when more than one obstacle to the bottom', () => {
            const testInput = `
....#.....
.........#
..........
..#.......
.#.....##.
..........
.#..^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(19);
        });

        it('Should correctly return the number of positions when more than one obstacle to the left', () => {
            const testInput = `
....#.....
.........#
..........
..#.......
.#.....#..
..........
.#..^.#...
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(18);
        });

        it('Should correctly return the number of positions when more than one obstacle to the right', () => {
            const testInput = `
....#.....
.......#.#
..........
..#.......
.#.....#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
            const day6Part1 = new Day6Part1(testInput);
            expect(day6Part1.positions).toBe(28);
        });
    });
});