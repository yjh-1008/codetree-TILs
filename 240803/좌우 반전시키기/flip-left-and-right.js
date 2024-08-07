const fs = require('fs');
const input= fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let ret = Number.MAX_VALUE;

const reverse = (n) => {
    return n ^= 1;
}

const go = (idx, cnt) => {
    if(cnt >= ret) return;
    if(cnt >1 && arr[0] === 0) return;
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
    if(idx > 1 && arr[idx-2] === 0) return;
    go(idx+1, cnt+1);
    arr=tmp;
    if(idx > 1 && arr[idx-2] === 0) return;
    go(idx+1, cnt);
}

function Solution() {
    // if(arr[0] === 0)
    go(1, 0);
    console.log(ret === Number.MAX_VALUE ? -1 : ret);
}

Solution();