// const xyz = require('./3-people');
const { people, ages } = require('./3-people');

// console.log(xyz);
// console.log("PRINT: ", people);
console.log("PRINT: ", people);
console.log("PRINT: ", ages);
// console.log(people);

/** os module */
const os = require('os');
// console.log(os)
console.log(os.platform(), os.homedir())