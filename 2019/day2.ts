import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export const day2Part1 = (noun: number, verb: number): number => {
  // First, get the contents of the input file for today's puzzle
  const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER, 'day2.txt');
  const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

  // Next, let's put every number in the input file into an array
  const input = inputFileContents.split(',').map(val => Number(val));
  // If the last line is blank, remove it
  if (Number.isNaN(input[input.length - 1])) {
    input.pop();
  }

  const handleIntcodeProgram = ([opcode, firstPos, secondPos, outputPos]: number[]): boolean => {
    if (opcode === 99) {
      return true;
    }

    const firstVal = input[firstPos];
    const secondVal = input[secondPos];
    const outputVal = opcode === 1
      ? firstVal + secondVal
      : firstVal * secondVal;
    input[outputPos] = outputVal;

    return false;
  };
  // Restore program to "1202 program alarm" 
  input[1] = noun;
  input[2] = verb;

  for (let i = 0; i < input.length; i += 4) {
    const isProgramFinished = handleIntcodeProgram(input.slice(i, i + 4));

    if (isProgramFinished) {
      break;
    }
  }

  return input[0];
};

export const day2Part2 = (): number => {
  const outputToFind = 19690720;
  let noun: number;
  let verb: number;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (day2Part1(i, j) === outputToFind) {
        noun = i;
        verb = j;
        break;
      }
    }
  }

  return noun * 100 + verb;
};
