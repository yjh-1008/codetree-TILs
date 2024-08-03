const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const N = Number(input);

const dp = Array(N+1).fill(0);
dp[0] = 1;
for(let i=1;i<=N;i++) {
    for(let j=1;j<=i;j++) {
        dp[i] += dp[j-1] * dp[i-j];
    }
}
console.log(dp[N])