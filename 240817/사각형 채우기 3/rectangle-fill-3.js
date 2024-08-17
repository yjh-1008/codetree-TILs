/**
 * n=0 0
 * n=1 2가지
 * n=2 7가지
 * n=N Map(N-1)*2 + Map(N-1) +1
 * 기존에 있던거 *2 왜? 옆칸으로 붙은 부분이 같은거니까.
 * 짝수라면? 원래 있던거 +1 왜? 2*1이 추가로 붙으니까.
 * 홀수라면? +2 n이 1일때 작업 반복이니까.
 * 44 + 22
 * n/2 === 0 -> map[n-1]*2 + map[n-1] + map[n-2];
 * n/3 === 0 -> map[n-1]*2 + map[n-1] + 1
 */
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const N = Number(input);

const dp = Array(N+1).fill(0);
dp[0] = 1;
dp[1] = 2;
dp[2] = 7;
const MOD = 1000000007
for(let i=3;i<=N;i++) {
    dp[i] = (dp[i-2] *3 + dp[i-1] * 2) % MOD;
    for(let j=i-3;j>=0;j--) {
        dp[i] += (dp[j] * 2) % MOD
    }
}

console.log(dp[N]);