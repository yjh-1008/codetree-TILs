const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);

const arr = input[1].split(" ").map(Number);
const dp = Array(N).fill(-1);
function Solution() {
    //N칸 점프하는 동안 dp[i+j] = Math.max(dp[i+j], dp[i]+1);
    dp[0] = 0
    for(let i=0;i<N;i++) {
        if(dp[i] === -1) continue;
        for(let j=1;j<=arr[i];j++) {
            if(i+j >= N) continue;
            if(dp[i+j] < dp[i]+1) {
                dp[i+j] = dp[i]+1;
            }
        }
    }
    console.log(Math.max(...dp))
}

Solution();