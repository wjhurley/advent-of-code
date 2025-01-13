import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day1Part1 = (fileContents: string): number => {
    const digits = fileContents
        .split('')
        .map(Number);
    let runningTotal = 0;

    for (let i = 0; i < digits.length; i++) {
        const currentDigit = digits[i];
        const nextDigit = digits[(i + 1) % digits.length];

        if (currentDigit === nextDigit) {
            runningTotal += currentDigit;
        }
    }

    return runningTotal;
};

export const day1Part2 = (fileContents: string): number => {
    const digits = fileContents
        .split('')
        .map(Number);
    const incrementor = digits.length / 2;
    let runningTotal = 0;

    for (let i = 0; i < digits.length; i++) {
        const currentDigit = digits[i];
        const nextDigit = digits[(i + incrementor) % digits.length];

        if (currentDigit === nextDigit) {
            runningTotal += currentDigit;
        }
    }

    return runningTotal;
};
