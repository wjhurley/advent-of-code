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

    for (let i = 0; i < numbers.length; i++) {
        const number1 = numbers[i];

        for (let j = 1; j < numbers.length; j++) {
            if (i === j) {
                // We can't use the same number twice, so skip it
                continue;
            }

            const number2 = numbers[j];

            if (number1 + number2 === 2020) {
                return number1 * number2;
            }
        }
    }

    throw new Error('No two numbers sum up to 2020!');
};

export const day1Part2 = (fileContents: string): number => {
    const numbers = parseFileContents(fileContents);

    for (let i = 0; i < numbers.length; i++) {
        const number1 = numbers[i];

        for (let j = 1; j < numbers.length; j++) {
            if (i === j) {
                // We can't use the same number twice, so skip it
                continue;
            }

            const number2 = numbers[j];

            for (let k = 2; k < numbers.length; k++) {
                if (i === k || j === k) {
                    // We can't use the same number again, so skip it
                    continue;
                }

                const number3 = numbers[k];

                if (number1 + number2 + number3 === 2020) {
                    return number1 * number2 * number3;
                }
            }
        }
    }

    throw new Error('No three numbers sum up to 2020!');
};
