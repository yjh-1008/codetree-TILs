const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const n = +input;

const arr = Array(1001).fill(0);

function go(cur) {
    if(cur === 0) return 1;
    else if(cur < 0 ) return 0;
    // else return arr[n];
    arr[n] = go(cur-2) + go(cur-3);
    return arr[n];
}

function Solution() {
    for(let i=2;i<=n;i++) {
        arr[n] = go(i);
    }
}
// arr[2] = 1;
// arr[3] = 1;
Solution();
if(arr[n] === 0) console.log(0);
else console.log(arr[n] % 10007)