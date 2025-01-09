import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day12.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const countHorizontalSides = (horizontalSides: Array<[number, number]>): number => {
    let sides = 0;

    // sort into rows
    horizontalSides.sort(
        ([ aY, aX ], [ bY, bX ]) => (
            aY === bY
                ? aX - bX
                : aY - bY
        ),
    );

    // count sides
    horizontalSides.forEach((side, i) => {
        const previousSide = horizontalSides[i - 1];
        const isContinuationOfSide = (
            previousSide?.[1] === side[1] - 1
            && previousSide[0] === side[0]
        );

        sides += isContinuationOfSide ? 0 : 1;
    });

    return sides;
};

export const countVerticalSides = (verticalSides: Array<[number, number]>): number => {
    let sides = 0;

    // sort into columns
    verticalSides.sort(
        ([ aY, aX ], [ bY, bX ]) => (
            aX === bX
                ? aY - bY
                : aX - bX
        ),
    );

    // count sides
    verticalSides.forEach((side, i) => {
        const previousSide = verticalSides[i - 1];
        const isContinuationOfSide = (
            previousSide?.[0] === side[0] - 1
            && previousSide[1] === side[1]
        );

        sides += isContinuationOfSide ? 0 : 1;
    });

    return sides;
};

export const parseGardenPlotMap = (file: string): string[][] => {
    return file
        .split('\n')
        .map(line => line.split(''));
};

export const day12Part1 = (input: string): number => {
    const gardenPlotMap = parseGardenPlotMap(input);
    const exploredPositions: number[][] = Array.from(
        { length: gardenPlotMap.length },
        () => Array(gardenPlotMap[0].length).fill(null),
    );
    let perimeterCost = 0;
    let nextRegionId = 0;

    for (const [ indexY, row ] of Object.entries(gardenPlotMap)) {
        for (const [ indexX, column ] of Object.entries(row)) {
            if (exploredPositions[Number(indexY)][Number(indexX)] !== null) {
                continue;
            }

            const regionId = nextRegionId++;
            const leftFences: Array<[number, number]> = [];
            const rightFences: Array<[number, number]> = [];
            const topFences: Array<[number, number]> = [];
            const bottomFences: Array<[number, number]> = [];
            let area = 0;

            const exploreRegion = ([ y, x ]: [number, number]): void => {
                if (exploredPositions[y][x] !== null) {
                    return;
                }

                const positionsToExplore: Array<[number, number]> = [];
                const leftPoint: [number, number] = [ y, x - 1 ];
                const rightPoint: [number, number] = [ y, x + 1 ];
                const topPoint: [number, number] = [ y - 1, x ];
                const bottomPoint: [number, number] = [ y + 1, x ];
                gardenPlotMap[leftPoint[0]][leftPoint[1]] === column
                    ? positionsToExplore.push(leftPoint)
                    : leftFences.push(leftPoint);
                gardenPlotMap[rightPoint[0]][rightPoint[1]] === column
                    ? positionsToExplore.push(rightPoint)
                    : rightFences.push(rightPoint);
                gardenPlotMap[topPoint[0]]?.[topPoint[1]] === column
                    ? positionsToExplore.push(topPoint)
                    : topFences.push(topPoint);
                gardenPlotMap[bottomPoint[0]]?.[bottomPoint[1]] === column
                    ? positionsToExplore.push(bottomPoint)
                    : bottomFences.push(bottomPoint);
                exploredPositions[y][x] = regionId;
                area += 1;
                positionsToExplore
                    .filter(point => point)
                    .forEach(point => exploreRegion(point));
            };

            exploreRegion([ Number(indexY), Number(indexX) ]);

            const perimeter = leftFences.length + rightFences.length + topFences.length + bottomFences.length;
            perimeterCost += perimeter * area;
        }
    }

    return perimeterCost;
};

export const day12Part2 = (input: string): number => {
    const gardenPlotMap = parseGardenPlotMap(input);
    const exploredPositions: number[][] = Array.from(
        { length: gardenPlotMap.length },
        () => Array(gardenPlotMap[0].length).fill(null),
    );
    let sideCost = 0;
    let nextRegionId = 0;

    for (const [ indexY, row ] of Object.entries(gardenPlotMap)) {
        for (const [ indexX, column ] of Object.entries(row)) {
            if (exploredPositions[Number(indexY)][Number(indexX)] !== null) {
                continue;
            }

            const regionId = nextRegionId++;
            const leftFences: Array<[number, number]> = [];
            const rightFences: Array<[number, number]> = [];
            const topFences: Array<[number, number]> = [];
            const bottomFences: Array<[number, number]> = [];
            let area = 0;
            let sides = 0;

            const exploreRegion = ([ y, x ]: [number, number]): void => {
                if (exploredPositions[y][x] !== null) {
                    return;
                }

                const positionsToExplore: Array<[number, number]> = [];
                const leftPoint: [number, number] = [ y, x - 1 ];
                const rightPoint: [number, number] = [ y, x + 1 ];
                const topPoint: [number, number] = [ y - 1, x ];
                const bottomPoint: [number, number] = [ y + 1, x ];
                gardenPlotMap[leftPoint[0]][leftPoint[1]] === column
                    ? positionsToExplore.push(leftPoint)
                    : leftFences.push(leftPoint);
                gardenPlotMap[rightPoint[0]][rightPoint[1]] === column
                    ? positionsToExplore.push(rightPoint)
                    : rightFences.push(rightPoint);
                gardenPlotMap[topPoint[0]]?.[topPoint[1]] === column
                    ? positionsToExplore.push(topPoint)
                    : topFences.push(topPoint);
                gardenPlotMap[bottomPoint[0]]?.[bottomPoint[1]] === column
                    ? positionsToExplore.push(bottomPoint)
                    : bottomFences.push(bottomPoint);
                exploredPositions[y][x] = regionId;
                area += 1;
                positionsToExplore
                    .filter(point => point)
                    .forEach(point => exploreRegion(point));
            };

            exploreRegion([ Number(indexY), Number(indexX) ]);

            sides += countVerticalSides(leftFences);
            sides += countVerticalSides(rightFences);
            sides += countHorizontalSides(topFences);
            sides += countHorizontalSides(bottomFences);
            sideCost += sides * area;
        }
    }

    return sideCost;
};
