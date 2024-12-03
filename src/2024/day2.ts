import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day2.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

const checkLine = (line: number[]): boolean => {
  let originalDifference = 0;

  for (let i = 1; i < line.length; i++) {
    const newDifference = line[i] - line[i - 1];

    if (i == 1) {
      originalDifference = newDifference;
    }

    // If direction (increment/decrement) has changed, the array is not valid
    if (originalDifference * newDifference <= 0) {
      return false;
    }

    if (Math.abs(newDifference) > 3) {
      return false;
    }
  }

  return true;
}

const parseFileContents = (file: string): number[][] => {
  return file
    .split('\n')
    .map(line => {
      return line
        .split(' ')
        .map(Number);
    });
};

export const day2Part1 = (fileContents: string): number => {
  const parsedReports = parseFileContents(fileContents);
  const safeReports: number[][] = [];

  for (const report of parsedReports) {
    const safe = checkLine(report);

    if (safe) {
      safeReports.push(report);
    }
  }

  return safeReports.length;
};

export const day2Part2 = (fileContents: string): number => {
  const parsedReports = parseFileContents(fileContents);
  const safeReports: number[][] = [];

  for (const report of parsedReports) {
    let safe = checkLine(report);

    if (!safe) {
      for (let k = 0; k < report.length; k++) {
        const reportSlice = report.slice();
        reportSlice.splice(k, 1);
        safe = checkLine(reportSlice);

        if (safe) {
          break;
        }
      }
    }

    if (safe) {
      safeReports.push(report);
    }
  }

  return safeReports.length;
};
