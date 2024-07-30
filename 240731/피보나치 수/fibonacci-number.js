const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = +input[0];
const arr = new Array(46).fill(-1);
function fibo(n) {
    if(arr[n] !== -1) {
        return arr[n];
    }

    if(n <= 2) {
        return 1;
    }

    else arr[n] = fibo(n-1) + fibo(n-2);

    return arr[n];
}

for(let i=1;i<=N;i++) {
    arr[i] = fibo(i);
}

console.log(arr[N])