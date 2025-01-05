import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import {
    directionMap,
    makeUniqueArray,
} from '../util';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day10.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export class Day10Part1 {
    private _scores = 0;

    private topographicMap: number[][];

    private trailheads: Array<[number, number]> = [];

    constructor(fileContents: string) {
        this.topographicMap = this.parseTopographicMap(fileContents);
        this.mapTrailheads();
    }

    private findAllTrailheadScores(): number {
        let runningTotal = 0;

        for (const trailhead of this.trailheads) {
            const trails = this.findAllTrailsFromPosition(trailhead).pop();

            if (trails === undefined || !trails.length) {
                continue;
            }

            runningTotal += makeUniqueArray(trails).length;
        }

        return runningTotal;
    }

    private findAllTrailsFromPosition(trailhead: [number, number]): Array<Array<[number, number]>> {
        const trails: Array<Array<[number, number]>> = [ [ trailhead ] ];
        const startingNumber = this.topographicMap[trailhead[0]][trailhead[1]] + 1;

        /* istanbul ignore next */
        if (startingNumber === 10) {
            return [ [ trailhead ] ];
        }

        let index = 0;

        for (let i = startingNumber; i <= 9; i++) {
            const innerTrail: Array<[number, number]> = [];

            if (trails[index] === undefined) {
                return trails;
            }

            for (const [ j, currentPosition ] of Object.entries(trails[index])) {
                const adjacentPositions = this.getAllAdjacentPositions(currentPosition);
                const matchingPositions = this.getMatchingPositions(adjacentPositions, i);

                innerTrail.push(...matchingPositions);

                if (Number(j) === trails[index].length - 1) {
                    trails.push(makeUniqueArray(innerTrail));
                }
            }

            index++;
        }

        return trails;
    }

    private getAdjacentPosition(
        [ y1, x1 ]: [number, number],
        direction: keyof typeof directionMap,
    ): [number, number] {
        const [ y2, x2 ] = directionMap[direction];

        return [ y1 + y2, x1 + x2 ];
    }

    private getAllAdjacentPositions(currentPosition: [number, number]): Array<[number, number]> {
        return [
            'down',
            'left',
            'right',
            'up',
        ]
            .map(dir => this.getAdjacentPosition(currentPosition, dir))
            .filter(([ y, x ]) => (
                y >= 0
                && x >= 0
                && y < this.topographicMap.length
                && x < this.topographicMap[0].length
            ));
    }

    private getMatchingPositions(
        positions: Array<[number, number]>,
        matcher: number,
    ): Array<[number, number]> {
        const matchingPositions: Array<[number, number]> = [];

        for (const [ y, x ] of positions) {
            if (this.topographicMap[y][x] === matcher) {
                matchingPositions.push([ y, x ]);
            }
        }

        return matchingPositions;
    }

    private mapTrailheads(): void {
        for (const [ indexY, row ] of Object.entries(this.topographicMap)) {
            for (const [ indexX, column ] of Object.entries(row)) {
                if (column === 0) {
                    this.trailheads.push([ Number(indexY), Number(indexX) ]);
                }
            }
        }
    }

    private parseTopographicMap(file: string): number[][] {
        return file
            .split('\n')
            .map(
                line => line
                    .split('')
                    .map(Number)
            );
    }

    public get scores(): number {
        if (this._scores === 0) {
            this._scores = this.findAllTrailheadScores();
        }

        return this._scores;
    }
}

export class Day10Part2 {
    private _scores = 0;

    private topographicMap: number[][];

    private trailheads: Array<[number, number]> = [];

    constructor(fileContents: string) {
        this.topographicMap = this.parseTopographicMap(fileContents);
        this.mapTrailheads();
    }

    private findAllTrailheadScores(): number {
        let runningTotal = 0;

        for (const trailhead of this.trailheads) {
            const trails = this.findAllTrailsFromPosition(trailhead).pop();

            if (trails === undefined || !trails.length) {
                continue;
            }

            runningTotal += trails.length;
        }

        return runningTotal;
    }

    private findAllTrailsFromPosition(trailhead: [number, number]): Array<Array<[number, number]>> {
        const trails: Array<Array<[number, number]>> = [ [ trailhead ] ];
        const startingNumber = this.topographicMap[trailhead[0]][trailhead[1]] + 1;

        /* istanbul ignore next */
        if (startingNumber === 10) {
            return [ [ trailhead ] ];
        }

        let index = 0;

        for (let i = startingNumber; i <= 9; i++) {
            const innerTrail: Array<[number, number]> = [];

            if (trails[index] === undefined) {
                return trails;
            }

            for (const [ j, currentPosition ] of Object.entries(trails[index])) {
                const adjacentPositions = this.getAllAdjacentPositions(currentPosition);
                const matchingPositions = this.getMatchingPositions(adjacentPositions, i);

                innerTrail.push(...matchingPositions);

                if (Number(j) === trails[index].length - 1) {
                    trails.push(innerTrail);
                }
            }

            index++;
        }

        return trails;
    }

    private getAdjacentPosition(
        [ y1, x1 ]: [number, number],
        direction: keyof typeof directionMap,
    ): [number, number] {
        const [ y2, x2 ] = directionMap[direction];

        return [ y1 + y2, x1 + x2 ];
    }

    private getAllAdjacentPositions(currentPosition: [number, number]): Array<[number, number]> {
        return [
            'down',
            'left',
            'right',
            'up',
        ]
            .map(dir => this.getAdjacentPosition(currentPosition, dir))
            .filter(([ y, x ]) => (
                y >= 0
                && x >= 0
                && y < this.topographicMap.length
                && x < this.topographicMap[0].length
            ));
    }

    private getMatchingPositions(
        positions: Array<[number, number]>,
        matcher: number,
    ): Array<[number, number]> {
        const matchingPositions: Array<[number, number]> = [];

        for (const [ y, x ] of positions) {
            if (this.topographicMap[y][x] === matcher) {
                matchingPositions.push([ y, x ]);
            }
        }

        return matchingPositions;
    }

    private mapTrailheads(): void {
        for (const [ indexY, row ] of Object.entries(this.topographicMap)) {
            for (const [ indexX, column ] of Object.entries(row)) {
                if (column === 0) {
                    this.trailheads.push([ Number(indexY), Number(indexX) ]);
                }
            }
        }
    }

    private parseTopographicMap(file: string): number[][] {
        return file
            .split('\n')
            .map(
                line => line
                    .split('')
                    .map(Number)
            );
    }

    public get scores(): number {
        if (this._scores === 0) {
            this._scores = this.findAllTrailheadScores();
        }

        return this._scores;
    }
}
