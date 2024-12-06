import {
    day3Part1,
    day3Part2,
    findMostRecentDoIndex,
} from '../../src/2024/day3';

describe('day3 tests', () => {
    describe('day3Part1 tests', () => {
        it('Should return the correct total with a single `mul()` statement', () => {
            const testString = 'mul(15,15)';
            expect(day3Part1(testString)).toBe(225);
        });

        it('Should return the correct total with multiple `mul()` statements', () => {
            const testString = 'mul(5,10)mul(7,8)foobarmul(4,11)';
            expect(day3Part1(testString)).toBe(150);
        });

        it('Should return 0 when no `mul()` statements exist', () => {
            const testString = 'foobarbazz';
            expect(day3Part1(testString)).toBe(0);
        });
    });

    describe('day3Part2 tests', () => {
        it('Should return 0 with only `mul()` statements after `don\'t()`', () => {
            const testString = 'don\'t()mul(15,15)';
            expect(day3Part2(testString)).toBe(0);
        });

        it('Should return the correct total with one `mul()` statement after `don\'t()`', () => {
            const testString = 'mul(5,10)mul(7,8)don\'t()foobarmul(4,11)';
            expect(day3Part2(testString)).toBe(106);
        });

        it('Should return the correct total with a mixture of `do()` and `don\'t()` statements', () => {
            const testString = 'mul(5,10)don\'t()mul(7,8)foodo()barmul(4,11)';
            expect(day3Part2(testString)).toBe(94);
        });

        it('Should return the correct total with a mixture of `do()` and `don\'t()` statements', () => {
            const testString = 'mul(5,10)don\'t()mul(7,8)foodo()barmul(4,11)don\'t()mul(7,8)';
            expect(day3Part2(testString)).toBe(94);
        });

        it('Should return 0 when no `mul()` statements exist', () => {
            const testString = 'foobarbazz';
            expect(day3Part2(testString)).toBe(0);
        });
    });

    describe('findMostRecentIndex tests', () => {
        const indices = [ 5, 10, 15, 20, 25, 30 ];

        it('Should return the closest index lower than the provided value', () => {
            const index = 13;
            expect(findMostRecentDoIndex(indices, index)).toBe(10);
        });

        it('Should return 0 when the provided value is lower than all indices', () => {
            const index = 3;
            expect(findMostRecentDoIndex(indices, index)).toBe(0);
        });

        it('Should return the last index when the provided value is higher than all indices', () => {
            const index = 33;
            expect(findMostRecentDoIndex(indices, index)).toBe(30);
        });
    });
});
