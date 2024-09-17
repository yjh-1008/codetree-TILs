const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = +input[0];
const arr = [0,...input[1].split(" ").map(Number)];
const dp = Array.from({length:N+1} ,() => new Array(3).fill(-1));
const Solution = () => {
 //요소 1계단을 얼만큼 사용했는가?
 //계단을 얼만큼 올랐는가
 //i번째 계단을 올랐을 때, 1계단을 오른 횟수.
 //같은 계단에 올랐을 때, 동전의 개수는 많을수록 좋다.
    //초기값 설정
    for(let i=0;i<3;i++) dp[0][i] = 0;
    // console.log(arr);
    for(let i=1;i<=N;i++) {
        dp[i][0] = dp[i-1][0]
        for(let j=0;j<3;j++) {
            if(i + 2 > N) {
                if(j > 0) dp[i][j] = Math.max(dp[i-1][j-1]+arr[i], dp[i][j]);
                // else dp[i][j] = dp[i1][p]
            } else {
                //2계단을 오를때
                if(i >=2) dp[i][j] = Math.max(dp[i][j], dp[i-2][j]+arr[i]);
                if(j < 2 && j>0) {
                    dp[i][j] = Math.max(dp[i][j], dp[i-1][j-1]+arr[i]);
                }
            }

        }
    }

    console.log(Math.max(...dp[N]))
}

Solution();