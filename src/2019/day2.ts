import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day5.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const parseFileContents = (file: string): number[] => {
    return file
        .split(',')
        .filter(val => val !== '')
        .map(Number);
};

export const day2Part1 = (fileContents: string, noun: number, verb: number): number => {
    const input = parseFileContents(fileContents);

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

export const day2Part2 = (fileContents: string, outputToFind: number): number => {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (day2Part1(fileContents, i, j) === outputToFind) {
                return i * 100 + j;
            }
        }
    }

    return 0;
};
