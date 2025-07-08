import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day5.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day5Part1 = (fileContents: string): number => {
    const stringsToCheck = fileContents
        .split('\n')
        .filter(str => str.trim() !== '');
    const vowelRegex = /[aeiou]/g;
    const repeaterRegex = /([a-z])\1/;
    const badStringRegex = /ab|cd|pq|xy/;
    let runningTotal = 0;

    for (const string of stringsToCheck) {
        const vowels = string.match(vowelRegex);
        const hasAtLeastThreeVowels = vowels !== null && vowels.length >= 3;
        const hasRepeaterCharacter = repeaterRegex.test(string);
        const hasBadString = badStringRegex.test(string);

        if (
            hasAtLeastThreeVowels
            && hasRepeaterCharacter
            && !hasBadString
        ) {
            runningTotal += 1;
        }
    }

    return runningTotal;
};
