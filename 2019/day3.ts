import { config } from 'dotenv';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

config();

export const day3Part1 = () => {
  // First, get the contents of the input file for today's puzzle
  const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER, 'day3.txt');
  const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');
  // Next, let's put every number in the input file into an array
  const input = inputFileContents.split('\n')
    .map(route => route.split(','));
  // If the last line is blank, remove it
  if (input[input.length - 1].length === 0) {
    input.pop();
  }
  // Main points for both lines (the directions provided in the input file: [D|L|R|U]\d+)
  const [lineA, lineB] = setInitialPlotPoints(input);
  // Loop through all points and find the intersections
  const intersections = findLineIntersections(lineA, lineB);
  // Find shortest distance out of all intersections
  const shortestDistance = findShortestDistance(intersections);

  return shortestDistance;
};

export const day3Part2 = () => {
  
};

const findLineIntersections = (lineA: number[][], lineB: number[][]): number[][] => {
  const intersections: number[][] = [];

  for (let i = 0; i < lineA.length - 1; i++) {
    const minAX: number = Math.min(lineA[i][0], lineA[i + 1][0]);
    const maxAX: number = Math.max(lineA[i][0], lineA[i + 1][0]);
    const minAY: number = Math.min(lineA[i][1], lineA[i + 1][1]);
    const maxAY: number = Math.max(lineA[i][1], lineA[i + 1][1]);

    for (let j = 0; j < lineB.length - 1; j++) {
      const minBX: number = Math.min(lineB[j][0], lineB[j + 1][0]);
      const maxBX: number = Math.max(lineB[j][0], lineB[j + 1][0]);
      const minBY: number = Math.min(lineB[j][1], lineB[j + 1][1]);
      const maxBY: number = Math.max(lineB[j][1], lineB[j + 1][1]);

      if (minAX === maxAX && minBY === maxBY // Check for no change on lineA x-axis or lineB y-axis (lines intersect)
        && minBX <= minAX && minAX <= maxBX // Check if lineA's x-axis falls within the range of lineB's
        && minAY <= minBY && minBY <= maxAY // Check if lineB's y-axis falls within the range of lineA's
        && minAX !== 0 && minBY !== 0 // Check if points are central port
      ) { // Check if lineA y-axis intersects lineB x-axis
        intersections.push([minAX, minBY]); // If lines intersect, use the static axes to determine intersection
      } else if (minAY === maxAY && minBX === maxBX // Check for no change on lineA y-axis or lineB x-axis
        && minAX <= minBX && minBX <= maxAX // Check if lineB's x-axis falls within the range of lineA's
        && minBY <= minAY && minAY <= maxBY // Check if lineA's y-axis falls within the range of lineB's
        && minBX !== 0 && minAY !== 0 // Check if points are central port
      ) { // Check if lineA x-axis intersects lineB y-axis
        intersections.push([minBX, minAY]); // If lines intersect, use the static axes to determine intersection
      } else if (minAX === maxAX && minBX === maxBX
        && minAX === minBX && maxAX === maxBX // Check if all x-axis values are equal
        && minAY <= maxBY && minBY <= maxAY // Check that perpendicular lines actually overlap
        && Math.max(minAY, minBY) !== 0 && Math.min(maxAY, maxBY) !== 0 // Check if intersection is on central port
        // && minAX !== 0 // Check if x-axis is on central port (not sure this one is needed)
      ) { // Check if lines are perpendicular AND overlapping on y-axis
        intersections.push([minAX, Math.max(minAY, minBY)]); // Use starting point with higher value for y-axis starting point
        intersections.push([minAX, Math.min(maxAY, maxBY)]); // Use ending point with lower value for y-axis ending point
      } else if (minAY === maxAY && minBY === maxBY
        && minAY === minBY && maxAY === maxBY // Check if all y-axis values are equal
        && minAX <= maxBX && minBX <= maxAX // Check that perpendicular lines actually overlap
        && Math.max(minAX, minBX) !== 0 && Math.min(maxAX, maxBX) !== 0 // Check if intersection is on central port
        // && minAY !== 0 // Check if y-axis is on central port (not sure this one is needed)
      ) { // Check if lines are perpendicular AND overlapping on x-axis
        intersections.push([Math.max(minAX, minBX), minAY]); // Use starting point with higher value for x-axis starting point
        intersections.push([Math.min(maxAX, maxBX), minAY]); // Use ending point with lower value for x-axis ending point

        if (Math.max(minAX, minBX) < 0 && 0 < Math.min(maxAX, maxBX)) {
          intersections.push([0, minAY]);
        }
      }
    }
  }

  return intersections;
};

const findShortestDistance = (intersections: number[][]): number => {
  const allDistances = intersections.map(plotPoint => {
    return Math.abs(plotPoint[0]) + Math.abs(plotPoint[1]);
  });

  allDistances.sort((a, b) => a - b);

  return allDistances[0];
};

const setAllStepsInBetween = (initialPoints: number[][][]): number[][][] => {
  const incrementalPlotPoints = initialPoints.map(line => {
    const newPlotPointSet = [];

    for (let step = 1; step < line.length; step++) {
      const startPoint = line[step - 1];
      const endPoint = line[step];
      // Determine whether the x or y axis that needs to be incremented
      const indexToIncrement = startPoint[0] === endPoint[0] ? 1 : 0;
      // If the values were decrementing, start needs to be end and vice versa
      const startLoop = startPoint[indexToIncrement] < endPoint[indexToIncrement]
        ? startPoint[indexToIncrement] + 1
        : endPoint[indexToIncrement];
      const endLoop = startPoint[indexToIncrement] < endPoint[indexToIncrement]
        ? endPoint[indexToIncrement]
        : startPoint[indexToIncrement] + 1;
  
      for (let step = startLoop; step < endLoop; step++) {
        const nextPoint = indexToIncrement === 1
          ? [startPoint[0], step]
          : [step, startPoint[1]];
    
        newPlotPointSet.push(nextPoint);
      }
    }
  
    return newPlotPointSet;
  });

  return incrementalPlotPoints;
};

const setInitialPlotPoints = (input: string[][]): number[][][] => {
  const plotPoints = [
    [ [0, 0] ],
    [ [0, 0] ],
  ];

  input.forEach((line, index) => {
    line.forEach((direction, step) => {
      const prevPlotPoint = plotPoints[index][step];
      const dir = direction.substring(0, 1);
      const steps = direction.substring(1);
      let newPlotPoint: number[];

      switch(dir) {
        case 'D':
          newPlotPoint = [prevPlotPoint[0], prevPlotPoint[1] - Number(steps)];
          plotPoints[index].push(newPlotPoint);
          break;  
        case 'L':
          newPlotPoint = [prevPlotPoint[0] - Number(steps), prevPlotPoint[1]];
          plotPoints[index].push(newPlotPoint);
          break;
        case 'R':
          newPlotPoint = [prevPlotPoint[0] + Number(steps), prevPlotPoint[1]];
          plotPoints[index].push(newPlotPoint);
          break;    
        case 'U':
          newPlotPoint = [prevPlotPoint[0], prevPlotPoint[1] + Number(steps)];
          plotPoints[index].push(newPlotPoint);
          break;
        default:
          return;
      }
    });
  });

  return plotPoints;
};

console.log(day3Part1());
