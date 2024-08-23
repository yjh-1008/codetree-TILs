const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const dp = Array(N).fill(1);
function Solution() {
    // dp[0] = 1;
    for(let i=1;i<N;i++) {
        for(let j=0;j<i;j++) {
            if(arr[i] > arr[j] && dp[i] < dp[j]+1) {
                dp[i] = dp[j]+1
            }
        }
    }
    console.log(Math.max(...dp))
    // console.log(dp[N-1])
}

Solution()