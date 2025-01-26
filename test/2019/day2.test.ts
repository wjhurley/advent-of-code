import { Day2Part2 } from '../../src/2019/day2';

describe('day2 tests', () => {
    describe('Day2Part2 tests', () => {
        it('Should return the correct value for position 0 using the provided value', () => {
            const day2Part2 = new Day2Part2(19690720);
            expect(day2Part2.output).toBe(5064);
        });

        it('Should return 0 if the provided value cannot be found at position 0', () => {
            const day2Part2 = new Day2Part2(100);
            expect(day2Part2.output).toBe(0);
        });
    });
});
