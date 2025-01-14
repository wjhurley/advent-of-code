import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day1Part1 = (fileContents: string): number => {
    const frequencyChanges = fileContents.split('\n');
    let startingFrequency = 0;

    for (const change of frequencyChanges) {
        const [ operator, ...numbers ] = change.split('');
        const frequencyChange = Number(numbers.join(''));

        switch (operator) {
            case '+':
                startingFrequency += frequencyChange;
                break;
            case '-':
                startingFrequency -= frequencyChange;
                break;
            default:
                throw new Error('Unknown operator!');
        }
    }

    return startingFrequency;
};

export const day1Part2 = (fileContents: string): number => {
    const frequencyChanges = fileContents.split('\n');
    let startingFrequency = 0;
    const frequencySet = new Set<number>([ startingFrequency ]);
    let isDuplicateFound = false;
    let index = 0;

    while (!isDuplicateFound) {
        const change = frequencyChanges[index % frequencyChanges.length];
        const [ operator, ...numbers ] = change.split('');
        const frequencyChange = Number(numbers.join(''));

        switch (operator) {
            case '+':
                startingFrequency += frequencyChange;
                break;
            case '-':
                startingFrequency -= frequencyChange;
                break;
            default:
                throw new Error('Unknown operator!');
        }

        if (frequencySet.has(startingFrequency)) {
            isDuplicateFound = true;

            return startingFrequency;
        }

        frequencySet.add(startingFrequency);
        index++;
    }

    /* istanbul ignore next */
    throw new Error('Impossible!');
};
