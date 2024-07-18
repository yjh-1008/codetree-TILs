const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map(item => item.split(" ").map(Number));
let ret = Number.MIN_VALUE;
const visited = new Array(N).fill(false);
let tmp = [];
function go(r) {
    if(r === N) {
        if(tmp.length !== N) return;
        let max = Number.MAX_VALUE
        for(let i = 0;i<N;i++) {
            max = Math.min(max, arr[i][tmp[i]])
        }
        
        ret = Math.max(ret, max);
        return;
    }

    for(let i=0;i<N;i++) {
        if(visited[i] === true) continue;
        visited[i] = true;
        tmp.push(i);
        go(r+1, tmp);
        tmp.pop();
        visited[i]= false;
    }
}

function Solution() {
    // console.log(arr)
    go(0);
    console.log(ret)
}

Solution();