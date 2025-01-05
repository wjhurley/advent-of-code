import {
    isArrayEqual,
    makeUniqueArray,
} from '../../src/util';

describe('util tests', () => {
    describe('isArrayEqual tests', () => {
        it('Should return true if both arrays have the same length and values', () => {
            expect(isArrayEqual([ 1, 3 ], [ 1, 3 ])).toBe(true);
        });

        it('Should return false if the arrays have different values', () => {
            expect(isArrayEqual([ 1, 3 ], [ 1, 2 ])).toBe(false);
        });

        it('Should return false if the arrays have different lengths', () => {
            expect(isArrayEqual([ 1, 3 ], [ 1, 2, 3 ])).toBe(false);
        });

        it('Should return true for matching nested arrays', () => {
            expect(isArrayEqual([ [ 1, 3 ] ], [ [ 1, 3 ] ])).toBe(true);
        });

        it('Should throw an error for arrays of objects (unsupported)', () => {
            expect(() => isArrayEqual([ { foo: 'bar' } ], [ { foo: 'bar' } ])).toThrow();
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