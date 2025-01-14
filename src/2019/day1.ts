import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day1Part1 = (fileContents: string): number => {
    const numbers = parseFileContents(fileContents);
    const moduleFuelRequirements = numbers.map(module => Math.floor(module / 3) - 2);

    return moduleFuelRequirements.reduce((acc, curr) => acc + curr, 0);
};

export const day1Part2 = (fileContents: string): number => {
    const numbers = parseFileContents(fileContents);
    const moduleFuelRequirements = numbers.map(module => Math.floor(module / 3) - 2);
    const moduleAndFuelRequirements = moduleFuelRequirements.map(module => findFuelRequired(module));

    return moduleAndFuelRequirements.reduce((acc, curr) => acc + curr, 0);
};

const findFuelRequired = (totalMass: number): number => {
    const fuelRequiredArray: number[] = [];
    let fuelRequired = Math.floor(totalMass / 3) - 2;

    if (fuelRequired <= 0) {
        return totalMass;
    }

    fuelRequiredArray.push(fuelRequired);

    while (fuelRequired > 0) {
        fuelRequired = Math.floor(fuelRequired / 3) - 2;

        if (fuelRequired > 0) {
            fuelRequiredArray.push(fuelRequired);
        }
    }

    const extraRequiredFuel = fuelRequiredArray.reduce((acc, curr) => acc + curr, 0);

    return totalMass + extraRequiredFuel;
};

const parseFileContents = (fileContents: string): number[] => {
    return fileContents
        .split('\n')
        .filter(val => val !== '')
        .map(Number);
};
