import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const parseFileContents = (fileContents: string): number[] => {
    return fileContents
        .split('\n')
        .filter(val => val !== '')
        .map(Number);
};

export const day1Part1 = (fileContents: string): number => {
    const numbers = parseFileContents(fileContents);
    let runningTotal = 0;

    for (let i = 1; i < numbers.length; i++) {
        const depth1 = numbers[i - 1];
        const depth2 = numbers[i];

        if (depth1 < depth2) {
            runningTotal++;
        }
    }

    return runningTotal;
};

export const day1Part2 = (fileContents: string): number => {
    const numbers = parseFileContents(fileContents);
    let runningTotal = 0;

    for (let i = 2; i < numbers.length - 1; i++) {
        const depth1 = numbers[i - 2];
        const depth2 = numbers[i - 1];
        const depth3 = numbers[i];
        const depth4 = numbers[i + 1];
        const combinedDepth1 = depth1 + depth2 + depth3;
        const combinedDepth2 = depth2 + depth3 + depth4;

        if (combinedDepth1 < combinedDepth2) {
            runningTotal++;
        }
    }

    return runningTotal;
};
