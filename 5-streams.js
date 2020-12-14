const fs = require('fs');

//use encoding to avoid using .toString() on chunk.
const readStream = fs.createReadStream('./docs/stream-input.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./docs/stream-output.txt', { encoding: 'utf-8' })

// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     console.log(chunk);

//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

//piping same as above.
readStream.pipe(writeStream);