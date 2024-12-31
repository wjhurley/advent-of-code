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

export class Day9Part2 {
    private _checkSum = 0;

    private diskMap: string[][];

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
        const flatMap = this.diskMap.flat();
        let runningTotal = 0;

        for (const [ index, block ] of Object.entries(flatMap)) {
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

        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index];

            if (block.every(val => /\d+/.test(val))) {
                continue;
            }

            for (let i = blocks.length - 1; i >= 0; i--) {
                const fileBlock = blocks[i];

                if (
                    fileBlock.every(val => val === '.')
                    || block.length < fileBlock.length
                    || i < index
                ) {
                    continue;
                }

                const blockNewLength = block.length - fileBlock.length;

                // Same size, no need to splice and create new free space array
                if (blockNewLength === 0) {
                    blocks[i] = block;
                    blocks[index] = fileBlock;
                } else {
                    blocks[i] = new Array<string>(block.length - blockNewLength).fill('.');
                    blocks[index] = new Array<string>(blockNewLength).fill('.');
                    blocks.splice(index, 0, fileBlock);
                }

                break;
            }
        }

        this.diskMap = blocks;
    }

    private parseDiskMap(file: string): string[][] {
        const digits = file.split('');
        let fileId = 0;
        let parsedDiskMap: string[][] = [];

        for (const [ index, digit ] of Object.entries(digits)) {
            if (Number(index) % 2 === 0) {
                const arr = new Array<string>(Number(digit)).fill(`${fileId}`);
                parsedDiskMap.push(arr);
                fileId++;
            } else {
                const arr = new Array<string>(Number(digit)).fill('.');
                parsedDiskMap.push(arr);
            }
        }

        return parsedDiskMap.filter(arr => arr.length > 0);
    }
}
