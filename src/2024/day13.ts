import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import { isArrayEqual } from '../2024/day6';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day13.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

interface PlotPoint {
    x: number;
    y: number;
}

interface Machine {
    buttonA: PlotPoint;
    buttonB: PlotPoint;
    prize: PlotPoint;
}

export const calculateTokensUsed = ([ buttonA, buttonB ]: [number, number]): number => {
    const buttonACost = 3;
    const buttonBCost = 1;

    return buttonA * buttonACost + buttonB * buttonBCost;
};

export const camelCaseKey = (machine: string): string => {
    return machine
        .split(' ')
        .map((key, index) => {
            if (index === 0) {
                return key.toLowerCase();
            } else {
                return key;
            }
        })
        .join('');
};

export class Day13Part1 {
    private _tokens = 0;

    private readonly machines: Machine[];

    constructor(fileContents: string) {
        this.machines = this.parseFileContent(fileContents);
    }

    private checkIfPrizeIsImpossible(machine: Machine): boolean {
        const {
            buttonA,
            buttonB,
            prize,
        } = machine;
        const maxX = (buttonA.x * 100) + (buttonB.x * 100);
        const maxY = (buttonA.y * 100) + (buttonB.y * 100);

        return (
            maxX < prize.x
            || maxY < prize.y
        );
    }

    private findLeastAmountOfTokens(): void {
        let runningTotal = 0;

        for (const machine of this.machines) {
            if (this.checkIfPrizeIsImpossible(machine)) {
                continue;
            }

            const {
                buttonA,
                buttonB,
                prize
            } = machine;

            const multiplesOfX = this.findMultiples(buttonA.x, buttonB.x, prize.x);
            const multiplesOfY = this.findMultiples(buttonA.y, buttonB.y, prize.y);

            const possibleAnswers = multiplesOfX.filter(
                arr => multiplesOfY.some(arr2 => isArrayEqual(arr, arr2))
            );

            if (
                !multiplesOfX.length
                || !multiplesOfY.length
                || !possibleAnswers.length
            ) {
                continue;
            }

            const tokenCosts = possibleAnswers.map(calculateTokensUsed);

            tokenCosts.sort();
            runningTotal += tokenCosts[0];
        }

        this._tokens = runningTotal;
    }

    private findMultiples(num1: number, num2: number, target: number): Array<[number, number]> {
        const multiples: Array<[number, number]> = [];

        // Check if either num1 or num2 is 0
        if (num1 === 0 || num2 === 0) {
            return multiples;
        }

        // Iterate through multiples of num1
        for (let multiple1 = 1; multiple1 * num1 <= target; multiple1++) {
            // Should not happen, but as a failsafe we can't exceed 100
            if (multiple1 > 100) {
                return multiples;
            }

            const j = target - (multiple1 * num1);

            // We need multiples for both numbers, so continue if nothing is left
            if (j === 0) {
                continue;
            }

            // Check if target - (multiple1 * num1) is a multiple of num2
            if (j % num2 === 0) {
                // Find multiple of num2
                const multiple2 = j / num2;

                if (multiple2 <= 100) {
                    multiples.push([ multiple1, multiple2 ]);
                }
            }
        }

        return multiples;
    }

    private parseFileContent(file: string): Machine[] {
        const machines: Machine[] = [];

        for (const lines of file.split('\n\n')) {
            const machine = {} as Machine;

            for (const line of lines.split('\n')) {
                const match = line.match(/(\w+(?:\s\w)*):\s(\w)[+=](\d+),\s(\w)[+=](\d+)/);

                if (match === null) {
                    throw new Error(`Failed to parse line of file! (Given: ${line})`);
                }

                const key = camelCaseKey(match[1]) as keyof Machine;
                const xKey = camelCaseKey(match[2]) as 'x';
                const xValue = Number(match[3]);
                const yKey = camelCaseKey(match[4]) as 'y';
                const yValue = Number(match[5]);

                machine[key] = {
                    [xKey]: xValue,
                    [yKey]: yValue,
                };
            }

            machines.push(machine);
        }

        return machines;
    }

    public get tokens(): number {
        if (this._tokens === 0) {
            this.findLeastAmountOfTokens();
        }

        return this._tokens;
    }
}
