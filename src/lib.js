function* listProduct(initial, ...rest) {
    const remainder = rest.length > 0 ? listProduct(...rest) : [[]];
    for (let r of remainder) for (let i of initial) yield [i, ...r];
}

const getInputArrays = (inputData = []) => inputData.map(x => x.split(','));

const getPairs = listProduct => (accumulator = {}) => (inputArray = []) => {
    const len = inputArray.length - 1;
    for (let i = 0; i < len; i++) {
        for (let j = 1; j <= len; j++) {
            accumulator[i] = [...listProduct(inputArray[i], inputArray[j])]
        }
    }
    return accumulator
};

const isEqual = (pair1 = '') => (pair2 = '') => (pair1 !== pair2) && pair1.split(',').every(a => pair2.split(',').includes(a));

const countPairs = (accumulator = {}) => (objectPairs = {}) => {
    const data = Object.values(objectPairs).flat().filter(([a, b]) => a !== b);
    for (let i = 0; i < data.length; i++) {
        const currentValue = data[i].join(',');
        accumulator[currentValue] = accumulator.hasOwnProperty(currentValue) ? accumulator[currentValue] + 1 : 1
    }
    return accumulator
};

const groupUniquePairs = isEqual => (thresholdValue = 0) => (accumulator = {}) => (uniqueNamePair = {}) => (objectPairs = {}) => {
    const initialFilter = Math.floor(thresholdValue/2);
    const keys = Object.keys(objectPairs).filter(x => objectPairs[x] >= initialFilter);
    const len = keys.length - 1;
    for (let i = 0; i < len; i++) {
        const a = keys[i];
        for (let j = i + 1; j <= len; j++) {
            const b = keys[j];
            if(isEqual(a)(b)) {
                if (!accumulator.hasOwnProperty(a)){
                    accumulator[a] = objectPairs[a] + objectPairs[b];
                    uniqueNamePair = { ...uniqueNamePair, [a]: a, [b]: b }
                }
            }
        }
        if(!accumulator.hasOwnProperty(a)) {
            if (!uniqueNamePair.hasOwnProperty(a)) {
                accumulator[a] = objectPairs[a]
            }
        }
    }
    return accumulator
};

const pairsAboveThreshold = (thresholdValue = 0) => (objectPairs = {}) => Object.keys(objectPairs).filter(x => objectPairs[x] >= thresholdValue);

const compose = (...functions) => (args) => functions.reduceRight((arg, fn) => fn(arg), args);

module.exports = {
      listProduct
    , isEqual
    , getInputArrays
    , getPairs
    , countPairs
    , groupUniquePairs
    , pairsAboveThreshold
    , compose
};
