import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day9.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export class Day9Part1 {
    private _checkSum = 0;

    private diskMap: string[];

    constructor(fileContents: string) {
        this.diskMap = this.parseDiskMap(fileContents);
        this.moveFileBlocks();
    }

    public get checkSum(): number {
        if (this._checkSum === 0) {
            this.calculateCheckSum();
        }

        return this._checkSum;
    }

    private calculateCheckSum(): void {
        let runningTotal = 0;

        for (const [ index, block ] of Object.entries(this.diskMap)) {
            /* istanbul ignore next */
            if (block === '.') {
                continue;
            }

            runningTotal += Number(index) * Number(block);
        }

        this._checkSum = runningTotal;
    }

    private moveFileBlocks(): void {
        const blocks = [ ...this.diskMap ];

        for (const [ index, block ] of Object.entries(blocks)) {
            if (/\d+/.test(block)) {
                continue;
            }

            let fileBlock = blocks.pop();

            while (fileBlock !== undefined && fileBlock === '.') {
                fileBlock = blocks.pop();
            }

            /* istanbul ignore next */
            if (fileBlock === undefined) {
                throw new Error('Impossible!');
            }

            blocks[Number(index)] = fileBlock;
        }

        // Filter out `undefined` entries
        this.diskMap = blocks.filter(block => !!block);
    }

    private parseDiskMap(file: string): string[] {
        const digits = file.split('');
        let fileId = 0;
        let parsedDiskMap: string[] = [];

        for (const [ index, digit ] of Object.entries(digits)) {
            if (Number(index) % 2 === 0) {
                const arr = new Array<string>(Number(digit)).fill(`${fileId}`);
                parsedDiskMap.push(...arr);
                fileId++;
            } else {
                const arr = new Array<string>(Number(digit)).fill('.');
                parsedDiskMap.push(...arr);
            }
        }

        return parsedDiskMap;
    }
}
