const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map(item => item.split(" ").map(Number));
let ret = Number.MIN_VALUE;
const visited = Array(N).fill(false);

function go(r, tmp) {
    if(r === N) {
        // console.log(tmp)
        const max = tmp.sort((a, b) => a-b)[0];
        
        ret = Math.max(ret, max);
        return;
    }

    for(let i=0;i<N;i++) {
        if(visited[i]) continue;
        visited[i] = true;
        tmp.push(arr[r][i]);
        go(r+1, tmp);
        tmp.pop();
        visited[i]= false;
    }
}

function Solution() {
    // console.log(arr)
    go(0, []);
    console.log(ret)
}

Solution();