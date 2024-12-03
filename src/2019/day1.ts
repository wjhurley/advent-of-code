import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export const day1Part1 = () => {
  const input = getFileContents();
  const moduleFuelRequirements = input.map(module => {
    return Math.floor(Number(module) / 3) - 2;
  });

  return moduleFuelRequirements.reduce((acc, curr) => acc + curr);
};

export const day1Part2 = () => {
  const input = getFileContents();
  const moduleFuelRequirements = input.map(module => {
    return Math.floor(Number(module) / 3) - 2;
  });
  const moduleAndFuelRequirements = moduleFuelRequirements.map(module => {
    return fuelRequiredFuel(module);
  });
  const totalFuelRequirement = moduleAndFuelRequirements.reduce((acc, curr) => acc + curr);

  return totalFuelRequirement;
};

const fuelRequiredFuel = (totalMass: number): number => {
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

  const extraRequiredFuel = fuelRequiredArray.reduce((acc, curr) => acc + curr);

  return totalMass + extraRequiredFuel;
};

const getFileContents = (): string[] => {
    // First, get the contents of the input file for today's puzzle
    const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
    const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
  
    // Next, let's put every line in the input file into an array
    const input = inputFileContents.split('\n');
    // If the last line is blank, remove it
    if (input[input.length - 1].trim() === '') {
      input.pop();
    }
  
    return input;
};
