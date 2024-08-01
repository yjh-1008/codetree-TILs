const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let lt = 0, rt = 0;
let ret =Number.MAX_VALUE

let sum = 0;
let j = 0;
for(let i=0;i<N;i++) {
    // sum += arr[i];
    while(true) {
        if(j>N || sum >= S) break;
        sum += arr[j++];
    }
    // console.log(sum);
    if(j <= N) {
        ret = Math.min(j-i, ret);
    }
    sum -= arr[i];
}

console.log(ret === Number.MAX_VALUE ? -1 : ret);