import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const parseFileContents = (file: string): string[] => (
    file
        .split('\n')
        .filter(val => val !== '')
);

export const day1Part1 = (fileContents: string): number => {
    const input = parseFileContents(fileContents);
    let pointer = 50;
    let stopsAtZero = 0;

    for (const instruction of input) {
        const direction = instruction[0];
        const distance = Number(instruction.substring(1));

        if (direction === 'L') {
            let buffer = 0;

            if (distance > pointer) {
                buffer = Math.ceil(distance / 100) * 100;
            }

            /* istanbul ignore next */
            if (distance > pointer + buffer) {
                throw new Error('Impossible!');
            }

            pointer = (pointer + buffer - distance) % 100;
        } else {
            pointer = (pointer + distance) % 100;
        }

        if (pointer === 0) {
            stopsAtZero += 1;
        }
    }

    return stopsAtZero;
};
