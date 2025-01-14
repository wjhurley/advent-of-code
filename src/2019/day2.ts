import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export class Day2Part2 {
    private readonly input: number[];

    private readonly outputToFind: number;

    private tempInput: number[];

    constructor(outputToFind: number) {
        // First, get the contents of the input file for today's puzzle
        const inputFilePath = path.join(__dirname, '../../input/2019/day2.txt');
        const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

        // Next, let's put every number in the input file into an array
        this.input = inputFileContents
            .split(',')
            .filter(val => val !== '')
            .map(Number);

        this.outputToFind = outputToFind;
    }

    private day2Part1(noun: number, verb: number): number {
        this.tempInput = [ ...this.input ];

        // Restore program to "1202 program alarm"
        this.tempInput[1] = noun;
        this.tempInput[2] = verb;

        for (let i = 0; i < this.tempInput.length; i += 4) {
            const isProgramFinished = this.handleIntcodeProgram(this.tempInput.slice(i, i + 4));

            if (isProgramFinished) {
                break;
            }
        }

        return this.tempInput[0];
    }

    private handleIntcodeProgram(slice: number[]): boolean {
        const [
            opcode,
            firstPos,
            secondPos,
            outputPos,
        ] = slice;

        if (opcode === 99) {
            return true;
        }

        const firstVal = this.tempInput[firstPos];
        const secondVal = this.tempInput[secondPos];

        this.tempInput[outputPos] = opcode === 1
            ? firstVal + secondVal
            : firstVal * secondVal;

        return false;
    }

    public get output(): number {
        let noun: number;
        let verb: number;

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                if (this.day2Part1(i, j) === this.outputToFind) {
                    noun = i;
                    verb = j;

                    return noun * 100 + verb;
                }
            }
        }

        return 0;
    }
}
