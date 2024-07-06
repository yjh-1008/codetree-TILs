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

    for(let i=1;i<=arr[cur];i++) {
        // console.log(cur, arr[cnt])
        go(cur + i, cnt+1);
    }
    return; 
}

function Solution() {
    // console.log(arr);
    go(0, 0);
    console.log(ret === Number.MAX_VALUE ? -1 : ret);
}

Solution();