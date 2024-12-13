import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day1Part1 = (fileContents: string): number => {
    let runningTotal = 0;

    for (const parenthesis of fileContents.split('')) {
        switch(parenthesis) {
            case '(':
                runningTotal++;
                break;
            case ')':
                runningTotal--;
                break;
            default:
                throw new Error(`Received unexpected value from input! (Given: ${parenthesis})`);
        }
    }

    return runningTotal;
};

export const day1Part2 = (fileContents: string): number => {
    const parentheses = fileContents.split('');
    let runningTotal = 0;

    for (const [ index, parenthesis ] of Object.entries(parentheses)) {
        if (parenthesis === '(') {
            runningTotal++;
        } else if (parenthesis === ')') {
            runningTotal--;

            if (runningTotal === -1) {
                return Number(index) + 1;
            }
        } else {
            throw new Error(`Received unexpected value from input! (Given: ${parenthesis})`);
        }
    }

    throw new Error('Provided instructions never enter the basement!');
};
