import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

import { directionIconDirectionMap } from '../util';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day3.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const day3Part1 = (fileContents: string): number => {
    const directions = fileContents.split('');
    const uniqueHouses = new Set<string>([ '0,0' ]);
    let [ y, x ] = [ 0, 0 ];

    for (const direction of directions) {
        const [ y1, x1 ] = directionIconDirectionMap[direction];

        y += y1;
        x += x1;
        uniqueHouses.add(`${y},${x}`);
    }

    return uniqueHouses.size;
};

export const day3Part2 = (fileContents: string): number => {
    const directions = fileContents.split('');
    const uniqueHouses = new Set<string>([ '0,0' ]);
    let [ y1, x1 ] = [ 0, 0 ];
    let [ y2, x2 ] = [ 0, 0 ];

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const [ y3, x3 ] = directionIconDirectionMap[direction];

        if (i % 2 === 0) {
            y1 += y3;
            x1 += x3;
            uniqueHouses.add(`${y1},${x1}`);
        } else {
            y2 += y3;
            x2 += x3;
            uniqueHouses.add(`${y2},${x2}`);
        }
    }

    return uniqueHouses.size;
};
