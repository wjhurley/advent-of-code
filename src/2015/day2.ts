import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day2.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day2Part1 = (fileContents: string): number => {
    const packages = fileContents.split('\n');
    let runningTotal = 0;

    for (const pkg of packages) {
        const [
            depth,
            length,
            width,
        ] = pkg
            .split('x')
            .map(Number);
        const sideA = depth * length;
        const sideB = depth * width;
        const sideC = length * width;
    
        runningTotal += 2 * sideA + 2 * sideB + 2 * sideC + Math.min(sideA, sideB, sideC);    
    }

    return runningTotal;
};

export const day2Part2 = (fileContents: string): number => {
    const packages = fileContents.split('\n');
    let runningTotal = 0;

    for (const pkg of packages) {
        const [
            depth,
            length,
            width,
        ] = pkg
            .split('x')
            .map(Number)
            .sort((a, b) => a - b);
    
        runningTotal += depth + depth + length + length + depth * length * width;    
    }

    return runningTotal;
};
