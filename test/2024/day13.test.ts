import {
    camelCaseKey,
    Day13Part1,
} from '../../src/2024/day13';

describe('day13 tests', () => {
    const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

    describe('camelCaseKey tests', () => {
        it('Should convert key to camelCase', () => {
            expect(camelCaseKey('Button A')).toBe('buttonA');
        });
    });

    describe('Day13Part1 tests', () => {
        it('Should return the correct number of tokens', () => {
            const day13Part1 = new Day13Part1(testInput);
            expect(day13Part1.tokens).toBe(480);
        });

        it('Should throw an error when provided with invalid input', () => {
            expect(() => new Day13Part1('))((1(((')).toThrow();
        });

        it('Should return 0 if no combination of multiples will reach the target', () => {
            const testInput = `Button A: X+2000, Y+34
Button B: X+900, Y+67
Prize: X=8400, Y=5400`;
            const day13Part1 = new Day13Part1(testInput);
            expect(day13Part1.tokens).toBe(0);
        });

            it('Should return an empty array when either number is 0', () => {
                const testInput = `Button A: X+94, Y+2000
Button B: X+22, Y+0
Prize: X=8400, Y=5400`;
                const day13Part1 = new Day13Part1(testInput);
                expect(day13Part1.tokens).toEqual(0);
            });
    });

    // describe('findMultiples tests', () => {
    //     it('Should find the multiples of two numbers that equal a target', () => {
    //         expect(findMultiples(94, 22, 8400)).toEqual([
    //             [ 69, 87 ],
    //             [ 80, 40 ],
    //         ]);
    //     });
    //
    //     it('Should find the multiples of two numbers that equal a target', () => {
    //         expect(findMultiples(34, 67, 5400)).toEqual([
    //             [ 13, 74 ],
    //             [ 80, 40 ],
    //         ]);
    //     });
    //
    //     it('Should return an empty array when no combination of multiples equal the target', () => {
    //         expect(findMultiples(2000, 900, 8400)).toEqual([]);
    //     });
    //
    //     it('Should return an empty array when either number is 0', () => {
    //         expect(findMultiples(20, 0, 8400)).toEqual([]);
    //     });
    // });

    // describe('parseFileContent tests', () => {
    //     it('Should properly parse input', () => {
    //         expect(parseFileContent(testInput)).toEqual([
    //             {
    //                 buttonA: {
    //                     x: 94,
    //                     y: 34,
    //                 },
    //                 buttonB: {
    //                     x: 22,
    //                     y: 67,
    //                 },
    //                 prize: {
    //                     x: 8400,
    //                     y: 5400,
    //                 },
    //             },
    //             {
    //                 buttonA: {
    //                     x: 26,
    //                     y: 66,
    //                 },
    //                 buttonB: {
    //                     x: 67,
    //                     y: 21,
    //                 },
    //                 prize: {
    //                     x: 12748,
    //                     y: 12176,
    //                 },
    //             },
    //             {
    //                 buttonA: {
    //                     x: 17,
    //                     y: 86,
    //                 },
    //                 buttonB: {
    //                     x: 84,
    //                     y: 37,
    //                 },
    //                 prize: {
    //                     x: 7870,
    //                     y: 6450,
    //                 },
    //             },
    //             {
    //                 buttonA: {
    //                     x: 69,
    //                     y: 23,
    //                 },
    //                 buttonB: {
    //                     x: 27,
    //                     y: 71,
    //                 },
    //                 prize: {
    //                     x: 18641,
    //                     y: 10279,
    //                 },
    //             },
    //         ]);
    //     });
    //
    //     it('Should throw an error when provided with an unexpected input', () => {
    //         expect(() => parseFileContent('foo\nbar')).toThrow();
    //     });
    // });
});
