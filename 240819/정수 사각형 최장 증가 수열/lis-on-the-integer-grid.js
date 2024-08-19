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
        if(moveable(nr, nc) && arr[r][c] < arr[nr][nc])  {
            dp[nr][nc] = Math.max(dp[r][c] +1, dp[nr][nc])
            
        }
    }
}

function Solution() {
    //이미 밟은 공간이라면 갈 수 있는 최대 범위를 간것.
    //dp[i][j]의 값은 여태까지 진입했던 모든 카운트의 최대값.
    //점화식 = Math.max(이전 발판의 카운트 + 1, 현재 발판의 값)
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(dp[i][j] === 0) {
                dp[i][j] = 1;
                go(i, j);
            } else go(i,j)
        }

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