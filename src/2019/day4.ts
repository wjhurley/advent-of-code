import { config } from 'dotenv';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

config();

export const day4Part1 = () => {
    // First, get the contents of the input file for today's puzzle
    const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day4.txt');
    const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
    // Next, let's get the start and end numbers from the input file
    const [start, end] = inputFileContents.split('-').map(num => Number(num));

    const possiblePasswords = findPasswords(start, end, hasDuplicates);

    return possiblePasswords.length;
};

export const day4Part2 = () => {
    // First, get the contents of the input file for today's puzzle
    const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day4.txt');
    const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
    // Next, let's get the start and end numbers from the input file
    const [start, end] = inputFileContents.split('-').map(num => Number(num));

    const possiblePasswords = findPasswords(start, end, hasDoubles);

    return possiblePasswords.length;
};

const findPasswords = (start: number, end: number, duplicateFn: (arr: Array<string | number>) => boolean): number[] => {
    const possiblePasswords: number[] = [];

    for (let i = start; i <= end; i++) {
        const numbers: number[] = i.toString().split('').map(num => Number(num));
        const sorted = [...numbers].sort();
        // Check that numbers increase
        if (!_.isEqual(numbers, sorted)) {
            continue;
        }
        // Check that two adjacent numbers are the same
        if (!duplicateFn(numbers)) {
            continue;
        }

        possiblePasswords.push(i);
    }

    return possiblePasswords;
};

const hasDoubles = (arr: Array<string | number>): boolean => {
    const counts: Record<string | number, number> = {};

    arr.forEach(val => counts[val] = (counts[val] || 0) + 1);

    return Object.values(counts).some(num => num === 2);
};

const hasDuplicates = (arr: Array<string | number>): boolean => {
    let hasDuplicate = false;

    for (let i = 0; i < arr.length - 1; i++) {
        const itemA = arr[i];
        const itemB = arr[i + 1];

        if (itemA === itemB) {
            hasDuplicate = true;
        }
    }

    return hasDuplicate;
};
