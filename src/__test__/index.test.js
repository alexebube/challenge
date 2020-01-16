const {
  compose
  , listProduct
  , isEqual
  , getPairs
  , getInputArrays
  , countPairs
  , groupUniquePairs
  , pairsAboveThreshold
} = require('../lib')

const {
  createFileIOInterface
  , readFile
} = require('../file');

const { readInterface, writeInterface } = createFileIOInterface('src/__test__/data/test.txt')('src/__test__/data/test.csv');

describe('challenge tests', () => {
  test('should return paired artist greater than 1', async () => {
    const inputData = await readFile(readInterface)([]);
    const expected = [ 'Morrissey,Radiohead' ];
    const result = compose(pairsAboveThreshold(2), groupUniquePairs(isEqual)(2)({})({}), countPairs({}), getPairs(listProduct)({}), getInputArrays)(inputData)
   expect(result).toEqual(expected)
  })
})
