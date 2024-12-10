import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day4.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const createWordSearchGrid = (file: string): string[][] => {
    return file
        .split('\n')
        .map(line => line.split(''));
};

export class Day4Part1 {
    private _wordCount: number;

    private readonly wordSearchGrid: string[][];

    constructor(fileContents: string) {
        this.wordSearchGrid = createWordSearchGrid(fileContents);
    }

    private getAllDirectionIndices([ x, y ]: [ number, number ]): Array<Array<[number, number]>> {
        const directions = [ // All assume starting position of [ 0, 0 ]
            [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ], // left-to-right
            [ [ 0, 0 ], [ -1, 0 ], [ -2, 0 ], [ -3, 0 ] ], // right-to-left
            [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ], // top-to-bottom
            [ [ 0, 0 ], [ 0, -1 ], [ 0, -2 ], [ 0, -3 ] ], // bottom-to-top
            [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ], // top-left-to-bottom-right
            [ [ 0, 0 ], [ -1, -1 ], [ -2, -2 ], [ -3, -3 ] ], // bottom-right-to-top-left
            [ [ 0, 0 ], [ -1, 1 ], [ -2, 2 ], [ -3, 3 ] ], // top-right-to-bottom-left
            [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ], // bottom-left-to-top-right
        ];
        const validDirectionIndices: Array<Array<[number, number]>> = [];

        directions:
        for (const direction of directions) {
            const row: Array<[number, number]> = [];

            for (const [ staticX, staticY ] of direction) {
                const newX = staticX + x;
                const newY = staticY + y;

                if (
                    newX < 0
                    || newX > this.wordSearchGrid[0].length - 1
                    || newY < 0
                    || newY > this.wordSearchGrid.length - 1
                ) {
                    continue directions;
                }

                row.push([ newX, newY ]);
            }

            validDirectionIndices.push(row);
        }

        return validDirectionIndices;
    }

    private getAllWords(): string[] {
        const words: string[] = [];

        for (let x = 0; x < this.wordSearchGrid.length; x++) {
            for (let y = 0; y < this.wordSearchGrid[x].length; y++) {
                words.push(...this.getAllWordsFromIndex([ x, y ]));
            }
        }

        this._wordCount = words.length;

        return words;
    }

    private getAllWordsFromIndex(index: [number, number]): string[] {
        const directionIndices = this.getAllDirectionIndices(index);
        const words: string[] = [];

        for (const direction of directionIndices) {
            let possibleWord = '';

            for (const [ x, y ] of direction) {
                possibleWord += this.wordSearchGrid[y][x];
            }

            if (possibleWord === 'XMAS') {
                words.push(possibleWord);
            }
        }

        return words;
    }

    public get wordCount(): number {
        if (!this._wordCount) {
            this.getAllWords();
        }

        return this._wordCount;
    }
}

export class Day4Part2 {
    private _wordCount: number;

    private centerIndexMap: Record<string, number> = {};

    private readonly wordSearchGrid: string[][];

    constructor(fileContents: string) {
        this.wordSearchGrid = createWordSearchGrid(fileContents);
    }

    private getAllDirectionIndices([ x, y ]: [ number, number ]): Array<Array<[number, number]>> {
        const directions = [ // All assume starting position of [ 0, 0 ]
            // [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ], // left-to-right
            // [ [ 0, 0 ], [ -1, 0 ], [ -2, 0 ] ], // right-to-left
            // [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ], // top-to-bottom
            // [ [ 0, 0 ], [ 0, -1 ], [ 0, -2 ] ], // bottom-to-top
            [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ] ], // top-left-to-bottom-right
            [ [ 0, 0 ], [ -1, -1 ], [ -2, -2 ] ], // bottom-right-to-top-left
            [ [ 0, 0 ], [ -1, 1 ], [ -2, 2 ] ], // top-right-to-bottom-left
            [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ] ], // bottom-left-to-top-right
        ];
        const validDirectionIndices: Array<Array<[number, number]>> = [];

        directions:
        for (const direction of directions) {
            const row: Array<[number, number]> = [];

            for (const [ staticX, staticY ] of direction) {
                const newX = staticX + x;
                const newY = staticY + y;

                if (
                    newX < 0
                    || newX > this.wordSearchGrid[0].length - 1
                    || newY < 0
                    || newY > this.wordSearchGrid.length - 1
                ) {
                    continue directions;
                }

                row.push([ newX, newY ]);
            }

            validDirectionIndices.push(row);
        }

        return validDirectionIndices;
    }

    private getAllWords(): void {
        let runningTotal = 0;

        for (let x = 0; x < this.wordSearchGrid.length; x++) {
            for (let y = 0; y < this.wordSearchGrid[x].length; y++) {
                this.getAllWordsFromIndex([ x, y ]);
            }
        }

        for (const occurrences of Object.values(this.centerIndexMap)) {
            if (occurrences === 2) {
                runningTotal++;
            }
        }

        this._wordCount = runningTotal;
    }

    private getAllWordsFromIndex(index: [number, number]): void {
        const directionIndices = this.getAllDirectionIndices(index);

        for (const direction of directionIndices) {
            let centerIndex = '';
            let possibleWord = '';

            for (const [ index, [ x, y ] ] of direction.entries()) {
                if (index === 1) {
                    centerIndex = `${x},${y}`;
                }

                possibleWord += this.wordSearchGrid[y][x];
            }

            if (possibleWord === 'MAS') {
                if (!this.centerIndexMap[centerIndex]) {
                    this.centerIndexMap[centerIndex] = 0;
                }

                this.centerIndexMap[centerIndex]++;
            }
        }
    }

    public get wordCount(): number {
        if (!this._wordCount) {
            this.getAllWords();
        }

        return this._wordCount;
    }
}
