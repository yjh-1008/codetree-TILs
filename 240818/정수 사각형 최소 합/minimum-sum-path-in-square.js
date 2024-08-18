const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})

const dp = Array.from({length:N},() => Array(N).fill(0));

dp[0][N-1] = arr[0][N-1];


function moveable(r, c) {
    return r >= 0 && r < N && c>= 0 && c<N;
}

// function go(r, c) {
//     if(dp[r][c]) return dp[r][c];

//     const dr = [1,0];
//     const dc = [0,-1];

//     let maxVal = 0;

//     for(let i=0; i<2 ;i++) {
//         const nr = dr[i] + r, nc = dc[i]+c;
//         if(moveable(nr, nc)) {

//         }
//     }

// }


function Solution() {


    for(let i=N-2;i>=0;i--) {
        dp[0][i] = dp[0][i+1] + arr[0][i];
    }


    for(let i=1;i<N;i++) {
        dp[i][N-1] = dp[i-1][N-1] + arr[i][N-1];
    }

    for(let i=1;i<N;i++) {
        for(let j=N-2;j>=0;j--) {
            dp[i][j] = Math.min(dp[i-1][j] + arr[i][j], dp[i][j+1] + arr[i][j]);
        }
    }
    // console.log(dp)
    console.log(dp[N-1][0])
}

Solution()