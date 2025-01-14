import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const spelledOutNumbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

export const replaceSpelledOutNumbersFromStart = (value: string): string => {
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < spelledOutNumbers.length; j++) {
            const regex = new RegExp(`^${spelledOutNumbers[j]}`);

            if (regex.test(value.substring(i))) {
                const replacedString = value
                    .substring(i)
                    .replace(regex, `${j + 1}`);

                return `${value.substring(0, i)}${replacedString}`;
            }
        }
    }

    return value;
};

export const replaceSpelledOutNumbersFromEnd = (value: string): string => {
    const smallestSpelledOutNumber = spelledOutNumbers
        .toSorted((a, b) => a.length - b.length)
        .shift();
    /* istanbul ignore next */
    const smallestLength = smallestSpelledOutNumber?.length ?? 1;

    for (let i = value.length - smallestLength; i >= 0; i--) {
        for (let j = 0; j < spelledOutNumbers.length; j++) {
            const regex = new RegExp(`${spelledOutNumbers[j]}`);

            if (regex.test(value.substring(i))) {
                const replacedString = value
                    .substring(i)
                    .replace(regex, `${j + 1}`);

                return `${value.substring(0, i)}${replacedString}`;
            }
        }
    }

    return value;
};

export const day1Part1 = (fileContents: string): number => {
    const lines = fileContents
        .split('\n')
        .map(line => line.replace(/\D+/g, ''));
    let runningTotal = 0;

    for (const line of lines) {
        runningTotal += Number(`${line[0]}${line[line.length - 1]}`);
    }

    return runningTotal;
};

export const day1Part2 = (fileContents: string): number => {
    const lines = fileContents.split('\n');
    let runningTotal = 0;

    for (let [ index, line ]  of Object.entries(lines)) {
        let str = line;
        const startingNumberIndex = str.search(/\d/);
        const endingNumberIndex = str
            .split('')
            .reverse()
            .join('')
            .search(/\d/);

        if (startingNumberIndex < endingNumberIndex) {
            str = replaceSpelledOutNumbersFromEnd(str);
            str = replaceSpelledOutNumbersFromStart(str);
        } else {
            str = replaceSpelledOutNumbersFromStart(str);
            str = replaceSpelledOutNumbersFromEnd(str);
        }

        str = str.replace(/\D/g, '');

        runningTotal += Number(`${str[0]}${str[str.length - 1]}`);
    }

    return runningTotal;
};
