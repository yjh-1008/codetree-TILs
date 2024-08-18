const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})
const dp = Array.from({length:N}, () => Array(N).fill(0));

for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
        dp[i][j] = arr[i][j];
    }
}

const dr = [1,0];
const dc = [0,1];

function moveable(r, c) {
    return r >= 0 && r < N && c >= 0 && c<N;
}

function go(r, c) {
    for(let i=0;i<2;i++) {
        const nr = dr[i] + r, nc = dc[i]+c;
        if(moveable(nr, nc)) {
            dp[nr][nc] = Math.max(dp[nr][nc], dp[r][c] + arr[nr][nc]);
            go(nr, nc)
        }
    }
}

function Solution() {
    go(0,0);

    console.log(dp[N-1][N-1])
};

Solution()