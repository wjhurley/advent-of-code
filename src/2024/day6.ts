import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import {
    directionIconMap,
    directionMap,
    isArrayEqual,
} from '../util';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day6.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export class Day6Part1 {
    private _positions = 0;

    private direction: [number, number];

    private floorMap: string[][];

    private guardPosition: [number, number];

    private hasCompletedPatrolPath = false;

    private obstacles: Array<[number, number]> = [];

    constructor(fileContents: string) {
        this.floorMap = this.parseFloorMap(fileContents);
        this.mapObstaclesAndGuardPosition();
        this.direction = directionMap.up;
    }

    private findClosestObstacle(obstacles: Array<[number, number]>): [number, number] {
        const [ y, x ] = this.guardPosition;

        switch(true) {
            case isArrayEqual(this.direction, directionMap.up):
                obstacles.sort(([ y1, x1 ], [ y2, x2 ]) => y2 - y1);
                break;
            case isArrayEqual(this.direction, directionMap.down):
                obstacles.sort(([ y1, x1 ], [ y2, x2 ]) => y1 - y2);
                break;
            case isArrayEqual(this.direction, directionMap.left):
                obstacles.sort(([ y1, x1 ], [ y2, x2 ]) => x2 - x1);
                break;
            case isArrayEqual(this.direction, directionMap.right):
                obstacles.sort(([ y1, x1 ], [ y2, x2 ]) => x1 - x2);
                break;
            /* istanbul ignore next */
            default:
                throw new Error('`this.direction` does not match any known direction!');
        }

        return obstacles[0];
    }

    private findNextObstacle(): [number, number] | undefined {
        const [ y, x ] = this.guardPosition;
        let obstacles: Array<[number, number]> = [];

        switch(true) {
            case isArrayEqual(this.direction, directionMap.up):
                obstacles = this.obstacles.filter(([ y2, x2 ]) => x2 === x && y2 < y);
                break;
            case isArrayEqual(this.direction, directionMap.down):
                obstacles = this.obstacles.filter(([ y2, x2 ]) => x2 === x && y2 > y);
                break;
            case isArrayEqual(this.direction, directionMap.left):
                obstacles = this.obstacles.filter(([ y2, x2 ]) => y2 === y && x2 < x);
                break;
            case isArrayEqual(this.direction, directionMap.right):
                obstacles = this.obstacles.filter(([ y2, x2 ]) => y2 === y && x2 > x);
                break;
            /* istanbul ignore next */
            default:
                throw new Error('`this.direction` does not match any known direction!');
        }

        if (obstacles.length === 0) {
            return undefined;
        } else if (obstacles.length === 1) {
            return obstacles[0];
        } else {
            return this.findClosestObstacle(obstacles);
        }
    }

    private findNextStop(nextObstacle: [number, number]): [number, number] {
        const [ y, x ] = nextObstacle;

        switch(true) {
            case isArrayEqual(this.direction, directionMap.up):
                return [ y + 1, x ];
            case isArrayEqual(this.direction, directionMap.down):
                return [ y - 1, x ];
            case isArrayEqual(this.direction, directionMap.left):
                return [ y, x + 1 ];
            case isArrayEqual(this.direction, directionMap.right):
                return [ y, x - 1 ];
            /* istanbul ignore next */
            default:
                throw new Error('`this.direction` does not match any known direction!');
        }
    }

    private mapObstaclesAndGuardPosition(): void {
        for (const [ indexY, row ] of Object.entries(this.floorMap)) {
            for (const [ indexX, column ] of Object.entries(row)) {
                if (column === '#') {
                    this.obstacles.push([ Number(indexY), Number(indexX) ]);
                } else if (Object.values(directionIconMap).includes(column)) {
                    this.guardPosition = [ Number(indexY), Number(indexX) ];
                }
            }
        }
    }

    private markPatrolPath(): void {
        while (!this.hasCompletedPatrolPath) {
            this.moveToNextStop();
        }

        this._positions = this.floorMap
            .flat()
            .reduce(
                (acc, val) => acc += Number(val === 'X'),
                0,
            );
    }

    private moveDown(): void {
        const [ y1, x ] = this.guardPosition;
        const nextObstacle = this.findNextObstacle();
        const y2 = this.floorMap.length - 1;
        let nextStop: [number, number] = [ y2, x ];

        if (nextObstacle) {
            nextStop = this.findNextStop(nextObstacle);
        } else {
            this.hasCompletedPatrolPath = true;
        }

        for (let y = y1; y < nextStop[0]; y++) {
            this.floorMap[y][x] = 'X';
        }

        this.turnRight();
        this.floorMap[nextStop[0]][x] = nextStop[0] === y2
            ? 'X'
            : directionIconMap.left;
        this.guardPosition = [ nextStop[0], x ];
    }

    private moveLeft(): void {
        const [ y, x1 ] = this.guardPosition;
        const nextObstacle = this.findNextObstacle();
        let nextStop: [number, number] = [ y, 0 ];

        if (nextObstacle) {
            nextStop = this.findNextStop(nextObstacle);
        } else {
            this.hasCompletedPatrolPath = true;
        }

        for (let x = x1; x > nextStop[1]; x--) {
            this.floorMap[y][x] = 'X';
        }

        this.turnRight();
        this.floorMap[y][nextStop[1]] = nextStop[1] === 0
            ? 'X'
            : directionIconMap.up;
        this.guardPosition = [ y, nextStop[1] ];
    }

    private moveRight(): void {
        const [ y, x1 ] = this.guardPosition;
        const nextObstacle = this.findNextObstacle();
        const x2 = this.floorMap[0].length - 1;
        let nextStop: [number, number] = [ y, x2 ];

        if (nextObstacle) {
            nextStop = this.findNextStop(nextObstacle);
        } else {
            this.hasCompletedPatrolPath = true;
        }

        for (let x = x1; x < nextStop[1]; x++) {
            this.floorMap[y][x] = 'X';
        }

        this.turnRight();
        this.floorMap[y][nextStop[1]] = nextStop[1] === x2
            ? 'X'
            : directionIconMap.down;
        this.guardPosition = [ y, nextStop[1] ];
    }

    private moveToNextStop(): void {
        switch(true) {
            case isArrayEqual(this.direction, directionMap.up):
                this.moveUp();
                break;
            case isArrayEqual(this.direction, directionMap.down):
                this.moveDown();
                break;
            case isArrayEqual(this.direction, directionMap.left):
                this.moveLeft();
                break;
            case isArrayEqual(this.direction, directionMap.right):
                this.moveRight();
                break;
            /* istanbul ignore next */
            default:
                throw new Error('`this.direction` does not match any known direction!');
        }
    }

    private moveUp(): void {
        const [ y1, x ] = this.guardPosition;
        const nextObstacle = this.findNextObstacle();
        let nextStop: [number, number] = [ 0, x ];

        if (nextObstacle) {
            nextStop = this.findNextStop(nextObstacle);
        } else {
            this.hasCompletedPatrolPath = true;
        }

        for (let y = y1; y > nextStop[0]; y--) {
            this.floorMap[y][x] = 'X';
        }

        this.turnRight();
        this.floorMap[nextStop[0]][x] = nextStop[0] === 0
            ? 'X'
            : directionIconMap.right;
        this.guardPosition = [ nextStop[0], x ];
    }

    private parseFloorMap(file: string): string[][] {
        return file
            .split('\n')
            .map(line => line.split(''));
    }

    public get positions(): number {
        if (this._positions === 0) {
            this.markPatrolPath();
        }

        return this._positions;
    }

    private turnRight(): void {
        switch(true) {
            case isArrayEqual(this.direction, directionMap.up):
                this.direction = directionMap.right;
                break;
            case isArrayEqual(this.direction, directionMap.down):
                this.direction = directionMap.left;
                break;
            case isArrayEqual(this.direction, directionMap.left):
                this.direction = directionMap.up;
                break;
            case isArrayEqual(this.direction, directionMap.right):
                this.direction = directionMap.down;
                break;
            /* istanbul ignore next */
            default:
                throw new Error('`this.direction` does not match any known direction!');
        }
    }
}
