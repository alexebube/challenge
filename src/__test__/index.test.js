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
} = require('../file')

const { readInterface } = createFileIOInterface('src/__test__/data/test.txt')('src/__test__/data/test.csv')

describe('challenge tests', () => {
  test('should return paired artist successfully', async () => {
    const inputData = await readFile(readInterface)([])
    const expected = ['Morrissey,Radiohead']
    const result = compose(pairsAboveThreshold(2), groupUniquePairs(isEqual)(2)({})({}), countPairs({}), getPairs(listProduct)({}), getInputArrays)(inputData)
    expect(result).toEqual(expected)
  })

  test('isEqual function', () => {
    expect(isEqual('Morrissey,Radiohead')('Radiohead,Morrissey')).toBeTruthy()
  })

  test('listProduct function', () => {
    const listProdGen = listProduct(['Morrissey', 'Radiohead', 'Delays'], ['Radiohead', 'Pulp', 'Morrissey'])
    expect(listProdGen.next().value).toEqual(['Morrissey', 'Radiohead']);
    expect(listProdGen.next().done).toBeFalsy()
  })

  test('getPairs function', () => {
    const input = [['Morrissey', 'Radiohead', 'Delays'],['Morrissey', 'Pulp', 'Radiohead']]
    const expected = {
      '0': [
        [ 'Morrissey', 'Morrissey' ],
        [ 'Radiohead', 'Morrissey' ],
        [ 'Delays', 'Morrissey' ],
        [ 'Morrissey', 'Pulp' ],
        [ 'Radiohead', 'Pulp' ],
        [ 'Delays', 'Pulp' ],
        [ 'Morrissey', 'Radiohead' ],
        [ 'Radiohead', 'Radiohead' ],
        [ 'Delays', 'Radiohead' ]
      ]
    }
    expect(getPairs(listProduct)({})(input)).toEqual(expected)
  })

  test('countPairs function', () => {
    const input = {
      '0': [
        [ 'Morrissey', 'Morrissey' ],
        [ 'Radiohead', 'Morrissey' ],
        [ 'Delays', 'Morrissey' ],
        [ 'Morrissey', 'Pulp' ],
        [ 'Radiohead', 'Pulp' ],
        [ 'Delays', 'Pulp' ],
        [ 'Morrissey', 'Radiohead' ],
        [ 'Radiohead', 'Radiohead' ],
        [ 'Delays', 'Radiohead' ]
      ]
    }

    const expected = {
      'Radiohead,Morrissey': 1,
      'Delays,Morrissey': 1,
      'Morrissey,Pulp': 1,
      'Radiohead,Pulp': 1,
      'Delays,Pulp': 1,
      'Morrissey,Radiohead': 1,
      'Delays,Radiohead': 1
    }
    expect(countPairs({})(input)).toEqual(expected)
  })

  test('groupUniquePairs function', () => {
    const input = {
      'Radiohead,Morrissey': 1,
      'Delays,Morrissey': 1,
      'Morrissey,Pulp': 1,
      'Radiohead,Pulp': 1,
      'Delays,Pulp': 1,
      'Morrissey,Radiohead': 1,
      'Delays,Radiohead': 1
    }
    const expected = {
      'Radiohead,Morrissey': 2,
      'Delays,Morrissey': 1,
      'Morrissey,Pulp': 1,
      'Radiohead,Pulp': 1,
      'Delays,Pulp': 1
    }
    expect(groupUniquePairs(isEqual)(2)({})({})(input)).toEqual(expected)
  })

  test('pairsAboveThreshold function', () => {
    const input = {
      'Radiohead,Morrissey': 2,
      'Delays,Morrissey': 1,
      'Morrissey,Pulp': 1,
      'Radiohead,Pulp': 1,
      'Delays,Pulp': 1
    }
    expect(pairsAboveThreshold(2)(input)).toEqual(['Radiohead,Morrissey'])
  })
})
