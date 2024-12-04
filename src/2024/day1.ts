import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const parseFileContents = (file: string): [number[], number[]] => {
    const leftFile: number[] = [];
    const rightFile: number[] = [];

    for (const line of file.split('\n')) {
        const [ left, right ] = line.split(/\s+/);
        leftFile.push(Number(left));
        rightFile.push(Number(right));
    }

    return [
        leftFile.sort(),
        rightFile.sort(),
    ];
};

export const day1Part1 = (fileContents: string): number => {
    const [ leftFile, rightFile ] = parseFileContents(fileContents);
    let runningTotal = 0;

    for (let i = 0; i < leftFile.length; i++) {
        const left = leftFile[i];
        const right = rightFile[i];
        runningTotal += Math.abs(left - right);
    }

    return runningTotal;
};

export const day1Part2 = (fileContents: string): number => {
    const [ leftFile, rightFile ] = parseFileContents(fileContents);
    const valueOccurrenceMap = rightFile.reduce<Record<number, number>>((map, num) => {
        if (!map[num]) {
            map[num] = 0;
        }

        map[num]++;

        return map;
    }, {});
    let runningTotal = 0;

    for (const left of leftFile) {
        const multiplier = valueOccurrenceMap[left] ?? 0;
        runningTotal += left * multiplier;
    }

    return runningTotal;
};
