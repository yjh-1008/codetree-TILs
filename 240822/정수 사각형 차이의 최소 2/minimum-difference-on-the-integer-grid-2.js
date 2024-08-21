const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})
const dp = Array.from({length:N}, () => new Array(N).fill(Number.MAX_SAFE_INTEGER));

function moveable(r, c) {
    return r >= 0 && r<N && c>=0 && c<N;
}

function go(r, c, max) {
    if(dp[r][c] !== Number.MAX_SAFE_INTEGER) {
        return dp[r][c];
    }

    const dr = [0,1];
    const dc = [1,0];
    let min = arr[r][c]
    for(let i=0;i<2;i++) {
        const nr = dr[i] + r, nc = dc[i]+c;

        if(moveable(nr, nc)) {
            max = Math.max(go(nr, nc, max), arr[nr][nc]);
            console.log(max)
            const val = Math.abs(max - arr[r][c])
            min =  Math.min(dp[r][c] , val);
        }
    }
    // console.log(dp)
    dp[r][c] = min
    return max;
}
//현재 위치에서의 최대값 - 최소값 한것들 중 최소값.
function Solution() {
    // let start = arr[0][0]
    // for(let i=1;i<N;i++) {
    //     if(arr[0][i] >= start) dp[0][i] = start;
    //     else start = arr[0][i];
    // }

    // start = arr[0][0]
    // for(let i=1;i<N;i++) {
    //     if(arr[i][0] >= start) dp[i][0] = start;
    //     else start = arr[i][0];
    // }

    go(0,0, arr[0][0]);
    console.log(dp)
}

Solution();