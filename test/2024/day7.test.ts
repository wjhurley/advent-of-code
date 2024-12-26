import {
    day7Part1,
} from '../../src/2024/day7';

describe('day7 tests', () => {
    describe('day7Part1 tests', () => {
        it('Should return the number of positions in the guard\'s patrol path', () => {
            const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
            expect(day7Part1(testInput)).toBe(3749);
        });

        it('Should throw an error for invalid input', () => {
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
            expect(() => day7Part1(testInput)).toThrow();
        });
    });
});