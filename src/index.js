const {
      compose
    , listProduct
    , isEqual
    , getPairs
    , getInputArrays
    , countPairs
    , groupUniquePairs
    , pairsAboveThreshold
} = require('./lib');

const {
      createFileIOInterface
    , readFile
    , writeFile
} = require('./file');

const main = async () => {
    const startTime = Date.now();
    const [,,inputFile = 'src/data/Artist_lists_small.txt', outputFile = 'src/out/out.csv'] = process.argv;
    const readableInterface = createFileIOInterface(inputFile)(outputFile);
    const inputData = await readFile(readableInterface)([]);
    console.log('readFile finished in: ', Date.now() - startTime);

    const inputArray = getInputArrays(inputData);
    console.log('inputArray finished in: ', Date.now() - startTime);

    const pairs = getPairs(listProduct)([])(inputArray);
    console.log('getPairs finished in: ', Date.now() - startTime);

    const countedPairs = countPairs(pairs);
    console.log('countPairs finished in: ', Date.now() - startTime);

    console.log(countedPairs)

    // const groupedPairs = groupUniquePairs(isEqual)({})([])(countedPairs);
    // const result = pairsAboveThreshold(50)(groupedPairs);

    // writeFile(readableInterface)(result);
    // compose(writeFile(readableInterface), pairsAboveThreshold(50), groupUniquePairs(isEqual)({})([]), countPairs, getPairs(listProduct)([]))(inputData)
};

main();
