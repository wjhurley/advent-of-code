import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export const day3Part1 = (): number => {
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

export const day3Part2 = (): number => {
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
  // Find shortest steps out of all intersections
  const shortestSteps = findShortestSteps(intersections, lineA, lineB);

  return shortestSteps;
};

const findLineIntersections = (lineA: number[][], lineB: number[][]): number[][] => {
  const intersections: number[][] = [];

  for (let i = 0; i < lineA.length - 1; i++) {
    const [minAX, maxAX, minAY, maxAY] = findMinAndMaxPlotPoints(lineA[i], lineA[i + 1]);

    for (let j = 0; j < lineB.length - 1; j++) {
      const [minBX, maxBX, minBY, maxBY] = findMinAndMaxPlotPoints(lineB[j], lineB[j + 1]);

      if (minAX === maxAX && minBY === maxBY // Check for no change on lineA x-axis or lineB y-axis (lines are perpendicular)
        && minBX <= minAX && minAX <= maxBX // Check if lineA's x-axis falls within the range of lineB's
        && minAY <= minBY && minBY <= maxAY // Check if lineB's y-axis falls within the range of lineA's
        && !(minAX === 0 && minBY === 0) // Check if intersection is the central port
      ) { // Check if lineA y-axis intersects lineB x-axis
        intersections.push([minAX, minBY]); // If lines intersect, use the static axes to determine intersection
      } else if (minAY === maxAY && minBX === maxBX // Check for no change on lineA y-axis or lineB x-axis
        && minAX <= minBX && minBX <= maxAX // Check if lineB's x-axis falls within the range of lineA's
        && minBY <= minAY && minAY <= maxBY // Check if lineA's y-axis falls within the range of lineB's
        && !(minBX === 0 && minAY === 0) // Check if intersection is the central port
      ) { // Check if lineA x-axis intersects lineB y-axis
        intersections.push([minBX, minAY]); // If lines intersect, use the static axes to determine intersection
      } else if (minAX === maxAX && minBX === maxBX
        && minAX === minBX && maxAX === maxBX // Check if all x-axis values are equal
        && minAY <= maxBY && minBY <= maxAY // Check that parallel lines actually overlap
        && !(Math.max(minAY, minBY) === 0 && Math.min(maxAY, maxBY) === 0) // Check if intersection is the central port
        // && minAX !== 0 // Check if x-axis is on central port (not sure this one is needed)
      ) { // Check if lines are parallel AND overlapping on y-axis
        intersections.push([minAX, Math.max(minAY, minBY)]); // Use starting point with higher value for y-axis starting point
        intersections.push([minAX, Math.min(maxAY, maxBY)]); // Use ending point with lower value for y-axis ending point
      } else if (minAY === maxAY && minBY === maxBY
        && minAY === minBY && maxAY === maxBY // Check if all y-axis values are equal
        && minAX <= maxBX && minBX <= maxAX // Check that parallel lines actually overlap
        && !(Math.max(minAX, minBX) === 0 && Math.min(maxAX, maxBX) === 0) // Check if intersection is the central port
        // && minAY !== 0 // Check if y-axis is on central port (not sure this one is needed)
      ) { // Check if lines are parallel AND overlapping on x-axis
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

const findLineIntersectionSteps = (intersection: number[], lineA: number[][], lineB: number[][]): number => {
  const findSteps = (line: number[][]): number => {
    let didLineHitIntersection = false;
    let i = 0;
    let totalSteps = 0;

    while (!didLineHitIntersection && i < line.length - 1) {
      const [minX, maxX, minY, maxY] = findMinAndMaxPlotPoints(line[i], line[i + 1]);

      if (minX === maxX && minX === intersection[0] // Check if line and intersection share the same x-axis
        && minY <= intersection[1] && intersection[1] <= maxY // Check if intersection's y-axis falls on line
      ) { // Add only partial distance to intersection to totalSteps
        totalSteps += Math.abs(intersection[1] - line[i][1]);
        didLineHitIntersection = true;
      } else if (minY === maxY && minY === intersection[1] // Check if line and intersection share the same y-axis
        && minX <= intersection[0] && intersection[0] <= maxX // Check if intersection's x-axis falls on line
      ) { // Add only partial distance to intersection to totalSteps
        totalSteps += Math.abs(intersection[0] - line[i][0]);
        didLineHitIntersection = true;
      } else {
        totalSteps += Math.abs(maxY - minY);
        totalSteps += Math.abs(maxX - minX);
        i++;
      }
    }

    return totalSteps;
  };

  const lineASteps = findSteps(lineA);
  const lineBSteps = findSteps(lineB);

  return lineASteps + lineBSteps;
};

const findMinAndMaxPlotPoints = (plot1: number[], plot2: number[]): number[] => {
  return [
    Math.min(plot1[0], plot2[0]),
    Math.max(plot1[0], plot2[0]),
    Math.min(plot1[1], plot2[1]),
    Math.max(plot1[1], plot2[1]),
  ];
};

const findShortestDistance = (intersections: number[][]): number => {
  const allDistances = intersections.map(plotPoint => {
    return Math.abs(plotPoint[0]) + Math.abs(plotPoint[1]);
  });

  allDistances.sort((a, b) => a - b);

  return allDistances[0];
};

const findShortestSteps = (intersections: number[][], lineA: number[][], lineB: number[][]): number => {
  const lineIntersectionSteps: number[] = [];
  intersections.forEach(intersection => {
    const steps = findLineIntersectionSteps(intersection, lineA, lineB);
    lineIntersectionSteps.push(steps);
  });

  lineIntersectionSteps.sort((a, b) => a - b);

  return lineIntersectionSteps[0];
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
