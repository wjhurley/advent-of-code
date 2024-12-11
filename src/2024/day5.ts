import { config } from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

config();

interface PageOrder {
    pagesAfter: number[];
    pagesBefore: number[];
}

// const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER ?? __dirname, 'day5.txt');
// const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

export const extractNumbers = (input: string, separator: string): number[] => {
    return input
        .split(separator)
        .map(Number);
};

export const parseDataStructures = (file: string): [ Record<number, PageOrder>, number[][] ] => {
    const pageOrderingRules: Record<number, PageOrder> = {};
    const updates: number[][] = [];
    const [ pageOrderingRulesRaw, updatesRaw ] = file.split('\n\n');

    for (const lineRaw of pageOrderingRulesRaw.split('\n')) {
        const [ firstPage, secondPage ] = extractNumbers(lineRaw, '|');
        pageOrderingRules[firstPage] = pageOrderingRules[firstPage] || { pagesAfter: [], pagesBefore: [] };
        pageOrderingRules[secondPage] = pageOrderingRules[secondPage] || { pagesAfter: [], pagesBefore: [] };

        pageOrderingRules[firstPage].pagesAfter.push(secondPage);
        pageOrderingRules[secondPage].pagesBefore.push(firstPage);
    }

    for (const lineRaw of updatesRaw.split('\n')) {
        updates.push(extractNumbers(lineRaw, ','));
    }

    return [
        pageOrderingRules,
        updates,
    ];
};

export const parsePageOrderingRules = (file: string): Array<[number, number]> => {
    const pageOrderingRules: Array<[number, number]> = [];
    const [ pageOrderingRulesRaw ] = file.split('\n\n');

    for (const lineRaw of pageOrderingRulesRaw.split('\n')) {
        const [ firstPage, secondPage ] = extractNumbers(lineRaw, '|');

        pageOrderingRules.push([ firstPage, secondPage ]);
    }

    return pageOrderingRules;
};

export const checkIfUpdateIsValid = (pageOrderingRules: Record<number, PageOrder>, update: number[]): boolean => {
    for (const [ index, page ] of Object.entries(update)) {
        const { pagesBefore } = pageOrderingRules[page];
        const remainingPages = update.slice(Number(index) + 1);

        for (const nextPage of remainingPages) {
            if (pagesBefore.includes(nextPage)) {
                return false;
            }
        }
    }

    return true;
};

export const getMiddleValueFromArray = (array: number[]): number => {
    if (array.length % 2 === 0) {
        throw new Error('Can\'t get middle value from array with even number of values!');
    }

    const middleIndex = Math.floor(array.length / 2);

    return array[middleIndex];
}

export const reorderUpdate = (pageOrderingRulesArray: Array<[number, number]>, update: number[]): number[] => {
    for (let i = 0; i < update.length - 1; i++) {
        const firstActualPage = update[i];
        const secondActualPage = update[i + 1];
        let rule = pageOrderingRulesArray.find(([ firstPage, secondPage ]) => (
            firstPage === firstActualPage && secondPage === secondActualPage
        ));

        if (!rule) {
            rule = pageOrderingRulesArray.find(([ firstPage, secondPage ]) => (
                firstPage === secondActualPage && secondPage === firstActualPage
            ));

            /* istanbul ignore next */
            if (!rule) {
                throw new Error(`Cannot find matching rule forward or backwards (Given: [ ${firstActualPage}, ${secondActualPage} ]`);
            }

            update[i] = secondActualPage;
            update[i + 1] = firstActualPage;

            return reorderUpdate(pageOrderingRulesArray, update);
        }
    }

    return update;
};

export const day5Part1 = (fileContents: string): number => {
    const [ pageOrderingRules, updates ] = parseDataStructures(fileContents);
    let runningTotal = 0;

    for (const update of updates) {
        const isUpdateValid = checkIfUpdateIsValid(pageOrderingRules, update);

        if (isUpdateValid) {
            const middlePage = getMiddleValueFromArray(update);
            runningTotal += middlePage;
        }
    }

    return runningTotal;
};

export const day5Part2 = (fileContents: string): number => {
    const [ pageOrderingRules, updates ] = parseDataStructures(fileContents);
    let runningTotal = 0;

    for (const update of updates) {
        const pageOrderingRulesArray = parsePageOrderingRules(fileContents);
        let isUpdateValid = checkIfUpdateIsValid(pageOrderingRules, update);

        if (isUpdateValid) {
            continue;
        }

        const reorderedUpdate = reorderUpdate(pageOrderingRulesArray, [ ...update ]);

        isUpdateValid = checkIfUpdateIsValid(pageOrderingRules, reorderedUpdate);

        if (isUpdateValid) {
            const middlePage = getMiddleValueFromArray(reorderedUpdate);
            runningTotal += middlePage;
        }
    }

    return runningTotal;
};
