import {
    day1Part1,
    day1Part2,
    getAllPointsBetweenPositions,
} from '../../src/2016/day1';

describe('day1 tests', () => {
    describe('day1Part1 tests', () => {
        it('Should return the shortest path with all right turns', () => {
            expect(day1Part1('R2, R2, R2')).toBe(2);
        });

        it('Should return the shortest path with a mixture of turns', () => {
            expect(day1Part1('R5, L5, R5, R3')).toBe(12);
        });

        it('Should return the shortest path when returning to the starting point with all left turns', () => {
            expect(day1Part1('L5, L5, L5, L5')).toBe(0);
        });

        it('Should return the shortest path when returning to the starting point with all right turns', () => {
            expect(day1Part1('R5, R5, R5, R5')).toBe(0);
        });

        it('Should throw an error with an invalid turn', () => {
            expect(() => day1Part1('L4, R4, C4')).toThrow();
        })
    });

    describe('day1Part2 tests', () => {
        it('Should return the shortest path to the first intersection', () => {
            expect(day1Part2('R8, R4, R4, R8')).toBe(4);
        });

        it('Should return the shortest path to the final position when there are no intersections', () => {
            expect(day1Part2('R8, L4, R4, L8')).toBe(24);
        });
    });

    describe('getAllPointsBetweenPositions tests', () => {
        it('Should return an array of strings representing all points between two horizontal, incrementing positions', () => {
            const positions = getAllPointsBetweenPositions([ 0, -1 ], [ 0, 3 ]);
            expect(positions).toEqual([ '0,0', '0,1', '0,2', '0,3' ]);
        });

        it('Should return an array of strings representing all points between two vertical, incrementing positions', () => {
            const positions = getAllPointsBetweenPositions([ -1, 0 ], [ 3, 0 ]);
            expect(positions).toEqual([ '0,0', '1,0', '2,0', '3,0' ]);
        });

        it('Should return an array of strings representing all points between two horizontal, decrementing positions', () => {
            const positions = getAllPointsBetweenPositions([ 0, 3 ], [ 0, -1 ]);
            expect(positions).toEqual([ '0,2', '0,1', '0,0', '0,-1' ]);
        });

        it('Should return an array of strings representing all points between two vertical, decrementing positions', () => {
            const positions = getAllPointsBetweenPositions([ 3, 0 ], [ -1, 0 ]);
            expect(positions).toEqual([ '2,0', '1,0', '0,0', '-1,0' ]);
        });

        it('Should throw an error if the positions are not along the same x or y axis', () => {
            expect(() => getAllPointsBetweenPositions([ 0, 0 ], [ 3, 3 ])).toThrow();
        });
    });
});
