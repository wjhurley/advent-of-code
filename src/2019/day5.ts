import { config } from 'dotenv';
import * as fs from 'fs';

config();

export const day5Part1 = (inputValue: number): number => {
    const inputFileContents = fs.readFileSync('/Users/williamhurley/Projects/advent-of-code/input/2019/day5.txt', 'utf-8');
    const input = inputFileContents
        .split(',')
        .filter(val => val !== '')
        .map(Number);
    let increment = 0;

    for (let i = 0; i < input.length; i += increment) {
        const [
            _parameter3,
            parameter2,
            parameter1,
            _,
            opCode,
        ] = input[i]
            .toString()
            .padStart(5, '0');

        let firstVal = 0;
        let secondVal = 0;
        let outputPos = 0;

        /* istanbul ignore next */
        if (input[i] === 99) {
            break;
        }

        /* istanbul ignore else */
        if (opCode === '1' || opCode === '2') {
            increment = 4;

            firstVal = parameter1 === '0'
                ? input[input[i + 1]]
                : input[i + 1];
            secondVal = parameter2 === '0'
                ? input[input[i + 2]]
                : input[i + 2];
            outputPos = input[i + 3];
        } else if (opCode === '3' || opCode === '4') {
            increment = 2;

            if (opCode === '3') {
                input[input[i + 1]] = inputValue;
            } else if (opCode === '4') {
                const value = parameter1 === '0'
                    ? input[input[i + 1]]
                    : input[i + 1];

                if (value !== 0) {
                    return value;
                }
            }

            continue;
        } else {
            /* istanbul ignore next */
            throw new Error(`Invalid opCode! (Given: ${input[i]}`);
        }

        switch (true) {
            case opCode === '1':
                input[outputPos] = firstVal + secondVal;
                break;
            case opCode === '2':
                input[outputPos] = firstVal * secondVal;
                break;
            /* istanbul ignore next */
            default:
                throw new Error(`Invalid or unsupported opcode (Given: ${opCode})`);
        }
    }

    /* istanbul ignore next */
    throw new Error('Output value not found!');
};
