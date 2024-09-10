const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = +input[0];
const arr = [0,...input[1].split(" ").map(Number)];
const total_sum = arr.reduce((acc, cur) => acc+cur, 0);
const M = 100000
const dp = Array.from({length:N+1},() => Array(M+1).fill(false));

const Solution = () => {
    dp[0][0] = true;
    for(let i=1;i<=N;i++) {
        for(let j=0;j<=M;j++) {
            if(j-arr[i] <0) continue;
            // console.log(j,arr[i], i)
            if(dp[i-1][j-arr[i]] === true) {
                dp[i][j] = true;
            }

            if(dp[i-1][j]) {
                dp[i][j] = true;
            }
        }
    }
    // console.log(dp[N].slice(0, M+1))

    for(let j=0;j<=M;j++) {
        if(dp[N][j] && total_sum - j === j) {
            console.log("Yes")
            return;
        } 
    }

    console.log("No");
}

Solution();