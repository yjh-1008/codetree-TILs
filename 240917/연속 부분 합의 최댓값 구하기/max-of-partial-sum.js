const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = +input[0];
const arr = [0,...input[1].split(" ").map(Number)];
const dp = Array(N+1).fill(-1)

const Solution = () => {
    dp[0] = 0;
    dp[1] = arr[1];

    //dp : i번째 이하의 속한 연속된 부분수열 중 최대의 값.
    for(let i=1;i<=N;i++) {
        dp[i] = Math.max(dp[i-1]+arr[i], arr[i]);
    }

    console.log(Math.max(...dp));
}

Solution();