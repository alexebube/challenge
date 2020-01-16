const {
  compose
  , listProduct
  , isEqual
  , getPairs
  , getInputArrays
  , countPairs
  , groupUniquePairs
  , pairsAboveThreshold
} = require('./lib')

const {
  createFileIOInterface
  , readFile
  , writeFile
} = require('./file')

const main = async () => {
  const [,, inputFile = 'src/data/Artist_lists_small.txt', outputFile = 'src/output/out.csv'] = process.argv
  const { readInterface, writeInterface } = createFileIOInterface(inputFile)(outputFile)
  const inputData = await readFile(readInterface)([])
  const threshold = 50
  compose(writeFile(writeInterface), pairsAboveThreshold(threshold), groupUniquePairs(isEqual)(threshold)({})({}), countPairs({}), getPairs(listProduct)({}), getInputArrays)(inputData)
}

main()
