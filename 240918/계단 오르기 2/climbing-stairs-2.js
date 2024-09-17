const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = +input[0];
const arr = [0,...input[1].split(" ").map(Number)];
const dp = Array.from({length:N+1} ,() => new Array(4).fill(Number.MIN_SAFE_INTEGER));
const Solution = () => {
 //요소 1계단을 얼만큼 사용했는가?
 //계단을 얼만큼 올랐는가
 //i번째 계단을 올랐을 때, 1계단을 오른 횟수.
 //같은 계단에 올랐을 때, 동전의 개수는 많을수록 좋다.
    //초기값 설정
    dp[0][0] =0
    // console.log(arr);
    for(let i=0;i<=N;i++) {
        // dp[i][0] = arr[i]
        for(let j=0;j<4;j++) {
            if(dp[i][j] === Number.MIN_SAFE_INTEGER) continue;
            if(i+1 <= N && j+1 <=3) {
                dp[i+1][j+1] = Math.max(dp[i][j]+ arr[i+1], dp[i+1][j+1]);
            }

            if(i+2<=N) {
                 dp[i+2][j] = Math.max(dp[i][j]+ arr[i+2], dp[i+2][j]);
            }
            // dp[i][j] = Math.max(dp[i][j], dp[i-1][j])

        }
    }

    console.log(Math.max(...dp[N]))
}

Solution();