const fs = require('fs');
const readline = require('readline');

const readFile = (ioInterface) => (acc = []) => new Promise(resolve => {
    ioInterface.on('line', (line) => {
        acc.push(line);
    });
    ioInterface.on('close', () => resolve(acc))
});

const writeFile = (ioInterface) => (data = []) => data.forEach(l => ioInterface.write(l));

const createFileIOInterface =  (inputFile = '') => (outputFile = '') => {
    const readableStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
    const writableStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });
    return readline.createInterface({ input: readableStream, output: writableStream });
};

module.exports = {
     readFile
    , writeFile
    , createFileIOInterface
};
