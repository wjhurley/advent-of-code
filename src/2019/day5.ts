import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export const day5Part1 = () => {
    // First, get the contents of the input file for today's puzzle
    const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day5.txt');
    const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
    // Next, let's get the start and end numbers from the input file
};

export const day5Part2 = () => {
    // First, get the contents of the input file for today's puzzle
    const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day5.txt');
    const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
    // Next, let's get the start and end numbers from the input file
};

console.log(day5Part1());
