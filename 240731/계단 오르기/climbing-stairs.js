const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const n = +input;

const arr = Array(6).fill(0);

function go(cur) {
    if(cur <= 0) return 0;
    // console.log(cur);
    if(arr[cur] !== 0) return arr[cur];
    
    // arr[cur] = 
    return go(cur-2) + go(cur-3);
}

function Solution() {
    for(let i=4;i<=n;i++) {
        arr[i] = go(i);
        // console.log(arr)
    }
}
arr[2] = 1;
arr[3] = 1;
Solution();
if(arr[n] === 0) console.log(0);
else console.log(arr[n] % 10007)