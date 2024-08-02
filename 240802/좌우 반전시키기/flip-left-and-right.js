const fs = require('fs');
const input= fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let ret = Number.MAX_VALUE;

const reverse = (n) => {
    return n === 1? 0 : 1;
}

const go = (idx, cnt) => {
    if(idx === N) {
        // let chk = true;
        const idx = arr.findIndex((item) => item === 0);
        if(idx === -1) {
            ret = Math.min(ret, cnt);
        }
        return;
    }


    const tmp = [...arr];

    arr[idx] = reverse(arr[idx]);
    if(idx-1 >= 0) arr[idx-1] = reverse(arr[idx-1]);
    if(idx+1 < N) arr[idx+1] = reverse(arr[idx+1]);

    go(idx+1, cnt+1);
    arr = tmp;
    go(idx+1, cnt);
}

function Solution() {
    go(0, 0);
    console.log(ret === Number.MAX_VALUE ? -1 : ret);
}

Solution();