const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n,m,k] = input[0].split(" ").map(Number);
const map = input[1].split(" ").map(Number);
let ret = -1;
function go(cnt, arr) {
    // console.log(arr)
    if(cnt === n) {
        // console.log(arr);
        let cnt = 0
        for(let i=0;i<arr.length;i++) {
            if(arr[i] >= m-1) {
                cnt++
            }
        }
        ret = Math.max(cnt, ret);
        return;
    }
    // console.log(arr);
    arr.forEach((item, index) => {
        // console.log(item)
            if(item + map[cnt] < m)  {
                arr[index] = item + map[cnt];
                go(cnt+1, arr);
                arr[index] = item;
            } else {
                arr[index] = m
                go(cnt+1, arr);
                arr[index] = item;
            }

        }
    )

}

function Solution() {
    // console.log(k)
    const arr = new Array(k).fill(0);
    go(0, arr);
    console.log(ret)
}

Solution();