const fs = require('fs');
const N = +fs.readFileSync(0).toString();
const DIV = Math.pow(10, 9) + 7;
const dp = Array.from(Array(1005), () => Array.from(Array(3), () => Array(3).fill(0)));
const Solution = () => {
    //dp: N일까지 살아남을 수 있는 경우의 수.
    dp[0][0][0] = 1;
    // console.log
    for(let i=0;i<N;i++) {
        for(let j=0;j<3;j++) {
            for(let k=0;k<3;k++) {
                if(!dp[i][j][k]) continue;

                dp[i+1][j][0] = dp[i+1][j][0] + (dp[i][j][k] % DIV);

                if(j<2) {
                    dp[i+1][j+1][0] = dp[i+1][j+1][0] + (dp[i][j][k] % DIV);
                }
                if(k<2) {
                    dp[i+1][j][k+1] = dp[i+1][j][k+1] + (dp[i][j][k] % DIV);
                }
            }
        }
    }
    let answer = 0
    for(let j=0;j<3;j++) {
        for(let k=0;k<3;k++) {
            // console.log(dp[2])
            answer += dp[N][j][k];
        }
    }
    console.log(answer)
}

Solution();