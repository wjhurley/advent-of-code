import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day11.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day11Part1 = (input: string, blinks: number): number => {
    let numbers = input
        .split(' ')
        .map(Number);

    for (let i = 1; i <= blinks; i++) {
        const newNumbers: number[] = [];

        for (let j = 0; j < numbers.length; j++) {
            const num = numbers[j];

            // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
            if (num === 0) {
                newNumbers.push(1);
                continue;
            }

            // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
            if (num.toString().length % 2 === 0) {
                const numString = num.toString();
                const middle = numString.length / 2;
                newNumbers.push(
                    Number(numString.substring(0, middle)),
                    Number(numString.substring(middle))
                );
                continue;
            }

            // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
            newNumbers.push(num * 2024);
        }

        numbers = newNumbers;
    }

    return numbers.length;
};
