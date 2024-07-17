const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => item.split(" ").map(Number));
const visited = Array(N).fill(false);
let ret = Number.MAX_VALUE

function go(r, sum, cnt) {
    //r이 0이라면 검사
    if(r === 0 && cnt === N) {
        ret = Math.min(ret, sum);
        return;
    }

    // if(cnt > N) return;
    // console.log(sum)
     for(let i=0;i<N;i++) {
        if(arr[r][i] === 0) continue;
        if(visited[i] === false) {
            visited[i] = true;
            let tmp = sum + arr[r][i];
            go(i, tmp, cnt+1);
            visited[i] = false;
        }
    }
    return;
}

function Solution() {
    //0,0부터 시작
    //C가 0인 경우게 검사.
     go(0, 0, 0);
    console.log(ret);
}

Solution();