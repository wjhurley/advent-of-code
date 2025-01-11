import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day1.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

enum Direction {
    East = 'East',
    North = 'North',
    South = 'South',
    West = 'West',
}
enum Turn {
    L = 'L',
    R = 'R',
}

interface NextPosition {
    newDirection: Direction;
    newPosition: [number, number];
}

interface NextPositionParams {
    blocks: number;
    direction: Direction;
    position: [number, number];
    turn: Turn;
}

export const getAllPointsBetweenPositions = (
    [ y1, x1 ]: [number, number],
    [ y2, x2 ]: [number, number],
): string[] => {
    const points: string[] = [];

    if (y1 === y2) {
        if (x1 < x2) {
            for (let x = x1 + 1; x <= x2; x++) {
                points.push(`${y1},${x}`);
            }
        } else {
            for (let x = x1 - 1; x >= x2; x--) {
                points.push(`${y1},${x}`);
            }
        }
    } else if (x1 === x2) {
        if (y1 < y2) {
            for (let y = y1 + 1; y <= y2; y++) {
                points.push(`${y},${x1}`);
            }
        } else {
            for (let y = y1 - 1; y >= y2; y--) {
                points.push(`${y},${x1}`);
            }
        }
    } else {
        throw new Error('Points are not along the same x or y axis!');
    }

    return points;
};

export const getNextPosition = (params: NextPositionParams): NextPosition => {
    const {
        blocks,
        direction,
        position,
        turn,
    } = params;
    const [ y, x ] = position;

    switch (true) {
        case direction === Direction.South && turn === Turn.L:
            return {
                newDirection: Direction.East,
                newPosition: [ y, x + blocks ],
            };
        case direction === Direction.South && turn === Turn.R:
            return {
                newDirection: Direction.West,
                newPosition: [ y, x - blocks ],
            };
        case direction === Direction.West && turn === Turn.L:
            return {
                newDirection: Direction.South,
                newPosition: [ y + blocks, x ],
            };
        case direction === Direction.West && turn === Turn.R:
            return {
                newDirection: Direction.North,
                newPosition: [ y - blocks, x ],
            };
        case direction === Direction.East && turn === Turn.L:
            return {
                newDirection: Direction.North,
                newPosition: [ y - blocks, x ],
            };
        case direction === Direction.East && turn === Turn.R:
            return {
                newDirection: Direction.South,
                newPosition: [ y + blocks, x ],
            };
        case direction === Direction.North && turn === Turn.L:
            return {
                newDirection: Direction.West,
                newPosition: [ y, x - blocks ],
            };
        case direction === Direction.North && turn === Turn.R:
            return {
                newDirection: Direction.East,
                newPosition: [ y, x + blocks ],
            };
        default:
            throw new Error('Direction and/or Turn are invalid!');
    }
};

export const day1Part1 = (fileContents: string): number => {
    const directions = fileContents.split(', ');
    let direction: Direction = Direction.North;
    let position: [number, number] = [ 0, 0 ];
    let index = 0;

    for (const dir of directions) {
        const [ turn, ...blocks ] = dir.split('');
        const {
            newDirection,
            newPosition,
        } = getNextPosition({
            blocks: Number(blocks.join('')),
            direction,
            position,
            turn: turn as Turn,
        });
        direction = newDirection;
        position = newPosition;
        index++;
    }

    return Math.abs(position[0]) + Math.abs(position[1]);
};

export const day1Part2 = (fileContents: string): number => {
    const directions = fileContents.split(', ');
    const positions = new Set<string>();
    let direction: Direction = Direction.North;
    let position: [number, number] = [ 0, 0 ];
    let index = 0;

    positions.add(position.join());

    for (const dir of directions) {
        const [ turn, ...blocks ] = dir.split('');
        const {
            newDirection,
            newPosition,
        } = getNextPosition({
            blocks: Number(blocks.join('')),
            direction,
            position,
            turn: turn as Turn,
        });

        const newPositions = getAllPointsBetweenPositions(position, newPosition);

        for (const pos of newPositions) {
            if (positions.has(pos)) {
                // We intersected with a previous position, so return the distance to that position
                const [ y, x ] = pos.split(',');

                return Math.abs(Number(y)) + Math.abs(Number(x)); //?
            }

            positions.add(pos);
        }

        direction = newDirection;
        position = newPosition;
        index++;
    }

    return Math.abs(position[0]) + Math.abs(position[1]);
};
