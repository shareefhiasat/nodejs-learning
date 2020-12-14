// console.log(global);

//we can do global.setTimeout as well.

setTimeout(() => {
   console.log("in the timeout");
   clearInterval(int);
   
}, 3000);

const int = setInterval(() => {
    console.log("in interval");
}, 1000);

console.log(__dirname);
console.log(__filename);