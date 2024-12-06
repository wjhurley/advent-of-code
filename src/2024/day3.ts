import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day3.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const findMostRecentDoIndex = (indices: number[], index: number): number => {
    const lastIndex = indices.length - 1;

    if (index < indices[0]) {
        return 0;
    }

    if (index > indices[lastIndex]) {
        return indices[lastIndex];
    }

    for (let i = 1; i < indices.length; i++) {
        const currentIndex = indices[i];

        if (currentIndex > index) {
            return indices[i - 1];
        }
    }

    /* istanbul ignore next */
    throw new Error(`Impossible! (Given: indices: ${indices.join(',')}, index: ${index})`);
};

export const day3Part1 = (fileContents: string): number => {
    const instructions = fileContents.match(/mul\(\d{1,3},\d{1,3}\)/g);
    let runningTotal = 0;

    if (instructions === null) {
        return runningTotal;
    }

    for (const instruction of instructions) {
        const multipliers = instruction.match(/\d+/g);

        /* istanbul ignore next */
        if (multipliers === null) {
            continue;
        }

        const [ multiplier1, multiplier2 ] = multipliers;
        runningTotal += Number(multiplier1) * Number(multiplier2);
    }

    return runningTotal;
};

export const day3Part2 = (fileContents: string): number => {
    const conditionalStatements = fileContents.matchAll(/do(n't)*\(\)/g);
    const instructions = fileContents.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    const conditionalStatementMap: Record<number, string> = {};
    const indices: number[] = [];
    let lastDoInstruction = 'do()';
    let runningTotal = 0;

    for (const statement of conditionalStatements) {
        const { index } = statement;
        const match = statement[0];
        conditionalStatementMap[index] = match;
        indices.push(index);
    }

    for (const instruction of instructions) {
        const { index } = instruction;
        const closestDoIndex = findMostRecentDoIndex(indices, index);
        lastDoInstruction = conditionalStatementMap[closestDoIndex] ?? 'do()';

        if (lastDoInstruction === 'do()') {
            const match = instruction[0];
            const multipliers = match.match(/\d+/g);

            /* istanbul ignore next */
            if (multipliers === null) {
                continue;
            }

            const [ multiplier1, multiplier2 ] = multipliers;
            runningTotal += Number(multiplier1) * Number(multiplier2);
        }
    }

    return runningTotal;
};
