import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day7.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const getCombinations = (operatorCount: number): string[][] => {
    const operators = [ '+', '*' ];
    const arr: string[][] = [ ...new Array(operatorCount) ].map(_ => operators);

    // When array contains 1 element
    if (operatorCount == 1) {
        return operators.map(s => ([ s ]));
    } else {
        const combinations = [];
        const newCount = operatorCount - 1;

        // Recur with the rest of the array.
        const otherCases = getCombinations(newCount);

        for (let i = 0; i < otherCases.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                combinations.push([ arr[0][j], ...otherCases[i] ]);
            }
        }

        return combinations;
    }
};

export const getCombinations2 = (operatorCount: number): string[][] => {
    const operators = [ '+', '*', '||' ];
    const arr: string[][] = [ ...new Array(operatorCount) ].map(_ => operators);

    // When array contains 1 element
    if (operatorCount == 1) {
        return operators.map(s => ([ s ]));
    } else {
        const combinations = [];
        const newCount = operatorCount - 1;

        // Recur with the rest of the array.
        const otherCases = getCombinations2(newCount);

        for (let i = 0; i < otherCases.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                combinations.push([ arr[0][j], ...otherCases[i] ]);
            }
        }

        return combinations;
    }
};

export const parseFileContents = (file: string): Record<number, number[]> => {
    const equations: Record<number, number[]> = {};

    for (const line of file.split('\n')) {
        const match = line.match(/(^\d+):\s(.+)/);

        if (match === null) {
            throw new Error(`Failed to parse line of file! (Given: ${line})`);
        }

        const sum = Number(match[1]);
        equations[sum] = match[2]
            .split(' ')
            .map(Number);
    }

    return equations;
};

export const day7Part1 = (fileContents: string): number => {
    const equations = parseFileContents(fileContents);
    const strs: any[] = [];
    let total = 0;

    for (const [ sum, numbers ] of Object.entries(equations)) {
        const { length } = numbers;
        const operators = getCombinations(length - 1);
        let isSumPossible = false;

        for (let i = 0; i < operators.length; i++) {
            let equationSum = numbers[0];

            for (let j = 0; j < operators[i].length; j++) {
                const number2 = numbers[j + 1];

                switch(operators[i][j]) {
                    case '+':
                        equationSum += number2;
                        break;
                    case '*':
                        equationSum *= number2;
                        break;
                    /* istanbul ignore next */
                    default:
                        throw new Error('Unknown operator!');
                }
            }

            if (Number(sum) === equationSum) {
                isSumPossible = true;
                break;
            }
        }

        if (isSumPossible) {
            total += Number(sum);
        }
    }

    return total;
};

export const day7Part2 = (fileContents: string): number => {
    const equations = parseFileContents(fileContents);
    const strs: any[] = [];
    let total = 0;

    for (const [ sum, numbers ] of Object.entries(equations)) {
        const { length } = numbers;
        const operators = getCombinations2(length - 1);
        let isSumPossible = false;

        for (let i = 0; i < operators.length; i++) {
            let equationSum = numbers[0];

            for (let j = 0; j < operators[i].length; j++) {
                const number2 = numbers[j + 1];

                switch(operators[i][j]) {
                    case '+':
                        equationSum += number2;
                        break;
                    case '*':
                        equationSum *= number2;
                        break;
                    case '||':
                        equationSum = Number(`${equationSum}${number2}`);
                        break;
                    /* istanbul ignore next */
                    default:
                        throw new Error('Unknown operator!');
                }
            }

            if (Number(sum) === equationSum) {
                isSumPossible = true;
                break;
            }
        }

        if (isSumPossible) {
            total += Number(sum);
        }
    }

    return total;
};
