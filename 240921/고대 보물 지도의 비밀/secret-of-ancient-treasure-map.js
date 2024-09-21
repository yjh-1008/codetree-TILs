//음수가 k개로 나타나는 연속합 중 최대값
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,K] = input[0].split(" ").map(Number);
const arr = [0,...input[1].split(" ").map(Number)]
const dp = Array.from({length:N+1}, () => Array(K+1).fill(-1));
const solution = () => {
    //dp : i번째 숫자를 선택했을 때, 음수가 K개 미만인 부분수열의 최대값.
    dp[0][0] = 0;
    let ans = 0, cnt = 0;//음수를 체크할 변수
    // /
    let lt= 0 , rt = 0;
    for(let i=1;i<=N;i++) {
        if(arr[i] < 0) {
            for(let k=0;k<K;k++) {
                dp[i][k+1] = Math.max(dp[i-1][k] + arr[i], arr[i]);
                ans = Math.max(dp[i][k], ans);
            }
        } else {
            for(let k=0;k<K+1;k++) {
                dp[i][k] = Math.max(dp[i-1][k] + arr[i], arr[i]);
                ans = Math.max(dp[i][k], ans);
            }
        }
    }
    console.log(ans);
}

solution();