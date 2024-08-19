const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})
const dp = Array.from({length:N}, () => Array(N).fill(0));

function moveable(r, c) {
    return r >= 0 && r < N && c>=0 && c<N;
}

function go(r, c) {
    // if(dp[r][c] !== 0) {
    //     return dp[r][c];
    // }
    const dr = [-1,1,0,0];
    const dc = [0,0,-1,1];
    for(let i=0;i<4;i++) {
        const nr = dr[i] +r, nc = dc[i] + c;
        if(moveable(nr, nc) && arr[r][c] < arr[nr][nc] )  {
            dp[nr][nc] = Math.max(dp[r][c] +1, dp[nr][nc])
            go(nr, nc);
        }
    }
}

function Solution() {
    //이미 밟은 공간이라면 갈 수 있는 최대 범위를 간것.
    //dp[i][j] = Math.max(dp[x][y]+1, dp[i][j]);

    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(dp[i][j] === 0) {
                dp[i][j] = 1;
                go(i, j);
            }
        }
        // console.log(dp);

    }

    let max = 0;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(max < dp[i][j]) max = dp[i][j]
        }
    }
    console.log(max);
}

Solution();