const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n,m,k] = input[0].split(" ").map(Number);
const map = input[1].split(" ").map(Number);
let ret = -1;
function go(cnt, arr) {
    if(cnt === n) {
        let cnt = 0
        for(let i=0;i<arr.length;i++) {
            if(arr[i] >= m) {
                cnt++
            }
        }
        ret = Math.max(cnt, ret);
        return;
    }

    arr.forEach((item, index) => {
        if(item < m) {
            arr[index] += map[cnt];
            go(cnt+1, arr);
            arr[index] -= map[cnt];
        }
    })
}

function Solution() {
    const arr = new Array(k).fill(0);
    console.log
    go(0, arr);
    console.log(ret)
}

Solution();