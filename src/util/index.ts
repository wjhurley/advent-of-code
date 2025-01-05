export const directionMap: Record<string, [number, number]> = {
    down: [ 1, 0 ],
    left: [ 0, -1 ],
    right: [ 0, 1 ],
    up: [ -1, 0 ],
};

export const isArrayEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            return isArrayEqual(arr1[i], arr2[i]);
        }

        if (typeof arr1[i] === 'object' && arr1[i] !== null) {
            throw new Error('Objects are not supported!');
        }

        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};

export const makeUniqueArray = <T>(arr: T[]): T[] => {
    const uniqueArray: T[] = [];

    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];

        if (Array.isArray(val)) {
            if (!uniqueArray.some(v => Array.isArray(v) && isArrayEqual(val, v))) {
                uniqueArray.push(val);
            }

            continue;
        }

        if (typeof val === 'object' && val !== null) {
            throw new Error('Objects are not supported!');
        }

        if (!uniqueArray.some(v => val === v)) {
            uniqueArray.push(val);
        }
    }

    return uniqueArray;
};
