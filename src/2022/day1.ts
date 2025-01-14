import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const parseFileContents = (fileContents: string): number[][] => {
    return fileContents
        .split('\n\n')
        .map(elf => (
            elf
                .split('\n')
                .map(Number)
        ));
};

export const day1Part1 = (fileContents: string): number => {
    const elves = parseFileContents(fileContents);
    let mostCalories = 0;

    for (const elf of elves) {
        const calories = elf.reduce((acc, val) => acc + val, 0);

        if (mostCalories === 0 || calories > mostCalories) {
            mostCalories = calories;
        }
    }

    return mostCalories;
};

export const day1Part2 = (fileContents: string): number => {
    const elves = parseFileContents(fileContents);
    const caloriesByElf: number[] = [];

    for (const elf of elves) {
        const calories = elf.reduce((acc, val) => acc + val, 0);

        caloriesByElf.push(calories);
    }

    return caloriesByElf
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, val) => acc + val, 0);
};
