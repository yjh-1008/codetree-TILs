const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const N = Number(input);
const dp = Array(N+1).fill(0);
dp[0] = 1;
dp[1] = 1;

for(let i=2;i<=N;i++) {
    dp[i] = (dp[i-1] + dp[i-2] * 2) % 10007;
}
console.log(dp[N])