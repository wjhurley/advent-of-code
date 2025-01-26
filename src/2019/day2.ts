import { config } from 'dotenv';
import * as fs from 'fs';

config();

export const day2Part1 = (noun: number, verb: number): number => {
    const inputFileContents = fs.readFileSync('/Users/williamhurley/Projects/advent-of-code/input/2019/day2.txt', 'utf-8');
    const input = inputFileContents
        .split(',')
        .filter(val => val !== '')
        .map(Number);

    input[1] = noun;
    input[2] = verb;

    for (let i = 0; i < input.length; i += 4) {
        const opcode = input[i];
        const firstPos = input[i + 1];
        const secondPos = input[i + 2];
        const outputPos = input[i + 3];

        if (opcode === 99) {
            break;
        }

        const firstVal = input[firstPos];
        const secondVal = input[secondPos];

        input[outputPos] = opcode === 1
            ? firstVal + secondVal
            : firstVal * secondVal;
    }

    return input[0];
};

export const day2Part2 = (outputToFind: number): number => {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (day2Part1(i, j) === outputToFind) {
                return i * 100 + j;
            }
        }
    }

    return 0;
};
