import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import { createMd5Hash } from '../util/md5';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day4.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day4Part1 = (secretKey: string): number => {
    for (let i = 0; i < 9999999; i++) {
        if (createMd5Hash(`${secretKey}${i}`).startsWith('00000')) {
            return i;
        }
    }

    /* istanbul ignore next */
    throw new Error('No number was found that could produce the proper hash key!');
};

export const day4Part2 = (secretKey: string): number => {
    for (let i = 0; i < 9999999; i++) {
        if (createMd5Hash(`${secretKey}${i}`).startsWith('000000')) {
            return i;
        }
    }

    /* istanbul ignore next */
    throw new Error('No number was found that could produce the proper hash key!');
};
