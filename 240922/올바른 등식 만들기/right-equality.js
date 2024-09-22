const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const dp = Array.from({length:N+1} , () => Array(41).fill(0));

//더하거나 뺀다
const solution = () => {
    // dp[0][0] = 0;
    //i-1번째에 더하거나 뺀 수에 더하거나 뺏을때 M인가?
    const isRange = (num) => {
        return num >= 0 && num < 41;
    }
    dp[0][arr[0]+ 20] += 1;
    dp[0][-1*arr[0] + 20] += 1;
    for(let i=1;i<=N;i++) {
        for(let j=0;j<41;j++) {
            if(dp[i-1][j] === -1) continue;
            if(isRange(j-arr[i])) {
                dp[i][j-arr[i]] += dp[i-1][j];
            }
            if(isRange(j+arr[i])) {
                dp[i][j+arr[i]] += dp[i-1][j];
            }
        }
    }
    
    console.log(dp[N-1][M+20])
}

solution();