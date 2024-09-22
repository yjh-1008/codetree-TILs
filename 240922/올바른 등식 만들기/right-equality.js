const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const arr = [0].concat(input[1].split(" ").map(Number));
const dp = Array.from({length:N+1} , () => Array(41).fill(0n));

//더하거나 뺀다
const solution = () => {
    dp[0][20] = 1n;
    // dp[0][-1*arr[0] + 20] = 1n;
    for(let i=1;i<=N;i++) {
        for(let j=0;j<41;j++) {
            // if(dp[i-1][j] === -1) continue;
            
            if(j-arr[i] >= 0) {
                // console.log('here')/
                dp[i][j] += dp[i-1][j-arr[i]];
            }
            if(j+arr[i] <= 40) {
                dp[i][j] += dp[i-1][j+arr[i]];
            }
        }
    }
    
    console.log(dp[N][M+20].toString())
}

solution();