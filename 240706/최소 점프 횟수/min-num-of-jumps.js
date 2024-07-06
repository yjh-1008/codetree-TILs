const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
let ret = Number.MAX_VALUE;
function go(cur, cnt) {
    if(cur === N-1) {
        ret = Math.min(cnt, ret);
        return;
    } else if(cur >  N)return;

    go(cur+1, cnt+1);
    go(cur + arr[cur], cnt+1);
    return; 
}

function Solution() {
    go(0, 0);
    console.log(ret);
}

Solution();