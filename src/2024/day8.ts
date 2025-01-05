import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import { isArrayEqual } from '../util';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day8.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export class Day8Part1 {
    private _antiNodes = 0;

    private antennaMap: string[][];

    private antennas: Record<string, Array<[number, number]>> = {};

    constructor(fileContents: string) {
        this.antennaMap = this.parseAntennaMap(fileContents);
        this.mapAntennas();
    }

    public get antiNodes(): number {
        if (this._antiNodes === 0) {
            this.findAntiNodes();
        }

        return this._antiNodes;
    }

    private findAntiNodes(): void {
        const minIndex = 0;
        const maxIndex = this.antennaMap.length - 1;
        const possibleAntiNodes: Array<[number, number]> = [];
        const validAntiNodes: Array<[number, number]> = [];

        for (const frequency of Object.values(this.antennas)) {
            for (const [ index, [ y1, x1 ] ] of Object.entries(frequency)) {
                const otherAntennas = [ ...frequency ];
                otherAntennas.splice(Number(index), 1);

                for (const [ y2, x2 ] of otherAntennas) {
                    const [ diffY, diffX ] = [ y2 - y1, x2 - x1 ];
                    possibleAntiNodes.push(
                        [ y1 - diffY, x1 - diffX ],
                        [ y2 + diffY, x2 + diffX ],
                    );
                }
            }
        }

        for (const possibleAntiNode of possibleAntiNodes) {
            const isPositionValid = possibleAntiNode.every(num => num >= minIndex && num <= maxIndex);
            const doesPositionAlreadyExist = validAntiNodes.some(
                antiNode => isArrayEqual(antiNode, possibleAntiNode)
            );

            if (isPositionValid && !doesPositionAlreadyExist) {
                validAntiNodes.push(possibleAntiNode);
            }
        }

        this._antiNodes = validAntiNodes.length;
    }

    private mapAntennas(): void {
        for (const [ indexY, row ] of Object.entries(this.antennaMap)) {
            for (const [ indexX, column ] of Object.entries(row)) {
                if (/\w/.test(column)) {
                    this.antennas[column] = this.antennas[column] || [];
                    this.antennas[column].push([ Number(indexY), Number(indexX) ]);
                }
            }
        }
    }

    private parseAntennaMap(file: string): string[][] {
        return file
            .split('\n')
            .map(line => line.split(''));
    }
}

export class Day8Part2 {
    private _antiNodes = 0;

    private antennaMap: string[][];

    private antennas: Record<string, Array<[number, number]>> = {};

    constructor(fileContents: string) {
        this.antennaMap = this.parseAntennaMap(fileContents);
        this.mapAntennas();
    }

    public get antiNodes(): number {
        if (this._antiNodes === 0) {
            this.findAntiNodes();
        }

        return this._antiNodes;
    }

    private checkIfPositionIsValid(possibleAntiNode: [number, number]): boolean {
        const minIndex = 0;
        const maxIndex = this.antennaMap.length - 1;

        return possibleAntiNode.every(num => num >= minIndex && num <= maxIndex);
    }

    private findAntiNodes(): void {
        const possibleAntiNodes: Array<[number, number]> = [];
        const validAntiNodes: Array<[number, number]> = [];

        for (const frequency of Object.values(this.antennas)) {
            if (frequency.length > 1) {
                possibleAntiNodes.push(...frequency);
            }

            for (const [ index, [ y1, x1 ] ] of Object.entries(frequency)) {
                const otherAntennas = [ ...frequency ];
                otherAntennas.splice(Number(index), 1);

                for (const [ y2, x2 ] of otherAntennas) {
                    const [ diffY, diffX ] = [ y2 - y1, x2 - x1 ];
                    let antiNode1Y = y1 - diffY;
                    let antiNode1X = x1 - diffX;
                    let antiNode2Y = y2 + diffY;
                    let antiNode2X = x2 + diffX;

                    while (
                        this.checkIfPositionIsValid([ antiNode1Y, antiNode1X ])
                        || this.checkIfPositionIsValid([ antiNode2Y, antiNode2X ])
                    ) {
                        if (this.checkIfPositionIsValid([ antiNode1Y, antiNode1X ])) {
                            possibleAntiNodes.push([ antiNode1Y, antiNode1X ]);
                        }

                        if (this.checkIfPositionIsValid([ antiNode2Y, antiNode2X ])) {
                            possibleAntiNodes.push([ antiNode2Y, antiNode2X ]);
                        }

                        antiNode1Y -= diffY;
                        antiNode1X -= diffX;
                        antiNode2Y += diffY;
                        antiNode2X += diffX;
                    }
                }
            }
        }

        for (const possibleAntiNode of possibleAntiNodes) {
            const doesPositionAlreadyExist = validAntiNodes.some(
                antiNode => isArrayEqual(antiNode, possibleAntiNode)
            );

            if (!doesPositionAlreadyExist) {
                validAntiNodes.push(possibleAntiNode);
            }
        }

        this._antiNodes = validAntiNodes.length;
    }

    private mapAntennas(): void {
        for (const [ indexY, row ] of Object.entries(this.antennaMap)) {
            for (const [ indexX, column ] of Object.entries(row)) {
                if (/\w/.test(column)) {
                    this.antennas[column] = this.antennas[column] || [];
                    this.antennas[column].push([ Number(indexY), Number(indexX) ]);
                }
            }
        }
    }

    private parseAntennaMap(file: string): string[][] {
        return file
            .split('\n')
            .map(line => line.split(''));
    }
}
