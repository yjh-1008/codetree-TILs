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
dp[1] = 2;
dp[2] = 7;
for(let i=3;i<=N;i++) {
    if(i %2 === 0) {
        dp[i] = (dp[i-1]*2) + dp[i-1] + dp[i-2] - 2;
    } else {
        dp[i] = (dp[i-1]*2) + dp[i-1] + dp[i-2] - 1
    }
}

console.log(dp[N]);