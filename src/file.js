const fs = require('fs')
const readline = require('readline')

const readFile = (ioInterface) => (acc = []) => new Promise(resolve => {
  ioInterface.on('line', (line) => {
    acc.push(line)
  })
  ioInterface.on('close', () => resolve(acc))
})

const writeFile = (ioInterface) => (data = []) => data.forEach(l => ioInterface.write(`${l}\n`))

const createFileIOInterface = (inputFile = '') => (outputFile = '') => {
  const readableStream = fs.createReadStream(inputFile, { encoding: 'utf8' })
  const writeInterface = fs.createWriteStream(outputFile, { encoding: 'utf8' })
  return { readInterface: readline.createInterface({ input: readableStream, terminal: false }), writeInterface }
}

module.exports = {
  readFile,
  writeFile,
  createFileIOInterface
}
