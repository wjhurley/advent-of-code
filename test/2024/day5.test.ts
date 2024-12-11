import {
    day5Part1,
    day5Part2,
    getMiddleValueFromArray,
    parseDataStructures,
    parsePageOrderingRules,
    reorderUpdate,
} from '../../src/2024/day5';

describe('day5 tests', () => {
    const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

    describe('day5Part1 tests', () => {
        it('Should return the sum of all middle pages for all correctly-ordered updates', () => {
            expect(day5Part1(testInput)).toBe(143);
        });
    });

    describe('day5Part2 tests', () => {
        it('Should return the sum of all middle pages for all incorrectly-ordered updates', () => {
            expect(day5Part2(testInput)).toBe(123);
        });
    });

    describe('getMiddleValueFromArray tests', () => {
        it('Should return the middle value from an array with an odd number of values', () => {
            expect(getMiddleValueFromArray([ 75, 47, 61, 53, 29 ])).toBe(61);
        });

        it('Should throw an error when provided an array with an even number of values', () => {
            expect(() => getMiddleValueFromArray([ 75, 47, 61, 53 ])).toThrow();
        });
    });

    describe('parseDataStructures tests', () => {
        it('Should return two data structures representing rules and updates', () => {
            expect(parseDataStructures(testInput)).toEqual([
                {
                    13: {
                        pagesAfter: [],
                        pagesBefore: [ 97, 61, 29, 47, 75, 53 ],
                    },
                    29: {
                        pagesAfter: [ 13 ],
                        pagesBefore: [ 75, 97, 53, 61, 47 ],
                    },
                    47: {
                        pagesAfter: [ 53, 13, 61, 29 ],
                        pagesBefore: [ 97, 75 ],
                    },
                    53: {
                        pagesAfter: [ 29, 13 ],
                        pagesBefore: [ 47, 75, 61, 97 ],
                    },
                    61: {
                        pagesAfter: [ 13, 53, 29 ],
                        pagesBefore: [ 97, 47, 75 ],
                    },
                    75: {
                        pagesAfter: [ 29, 53, 47, 61, 13 ],
                        pagesBefore: [ 97 ],
                    },
                    97: {
                        pagesAfter: [ 13, 61, 47, 29, 53, 75 ],
                        pagesBefore: [],
                    },
                },
                [
                    [ 75, 47, 61, 53, 29 ],
                    [ 97, 61, 53, 29, 13 ],
                    [ 75, 29, 13 ],
                    [ 75, 97, 47, 61, 53 ],
                    [ 61, 13, 29 ],
                    [ 97, 13, 75, 29, 47 ],
                ],
            ]);
        });
    });

    describe('parsePageOrderingRules tests', () => {
        it('Should return a single two-dimensional array represnting rules', () => {
            expect(parsePageOrderingRules(testInput)).toEqual([
                [ 47, 53 ],
                [ 97, 13 ],
                [ 97, 61 ],
                [ 97, 47 ],
                [ 75, 29 ],
                [ 61, 13 ],
                [ 75, 53 ],
                [ 29, 13 ],
                [ 97, 29 ],
                [ 53, 29 ],
                [ 61, 53 ],
                [ 97, 53 ],
                [ 61, 29 ],
                [ 47, 13 ],
                [ 75, 47 ],
                [ 97, 75 ],
                [ 47, 61 ],
                [ 75, 61 ],
                [ 47, 29 ],
                [ 75, 13 ],
                [ 53, 13 ],
            ]);
        });
    });

    describe('reorderUpdate tests', () => {
        it('Should reorder an array of updates based on the provided rules', () => {
            const pageOrderingRulesArray = parsePageOrderingRules(testInput);
            const reorderedUpdate = reorderUpdate(pageOrderingRulesArray, [ 97, 13, 75, 29, 47 ]);
            expect(reorderedUpdate).toEqual([ 97, 75, 47, 29, 13 ]);
        });
    });
});