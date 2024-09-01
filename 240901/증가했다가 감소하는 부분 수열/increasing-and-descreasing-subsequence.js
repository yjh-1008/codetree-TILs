const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const dp = Array.from({length:1001}, () => Array(1001).fill([0,0]));
let answer = -1;
function Solution() {
    for(let i=0;i<=N;i++) {
        dp[0][i]  = [1,0]
    }

    //dp = 현재 index까지 왔을 때, 가장 긴 증가하는 부분 수열의 길이.
    //i전까지 j가 순회를 하면서 가장 긴 증가하는 부분 수열의 길이를 체크.
    //현재가 증가했다 감소했는지, 증가만 했는지, 감소만 했는지 판별하는 로직  필요.

    // 1은 증가하는중, 2는 감소하는중

    for(let i=1;i<=N;i++) {
        for(let j=0;j<i;j++) {
            //증가하는 부분.
            if(arr[i] > arr[j]) {
                //감소하는 상태였다면 증가 불가.
                if(dp[i-1][j][1] === 2) {
                    if(dp[i][j][0] < dp[i-1][j][0] ) {
                        dp[i][j] = [dp[i-1][j][0], 1];
                    } else dp[i][j] = [dp[i-1][j][0], 1];
                } else {
                    if(dp[i][j][0] < dp[i-1][j][0] +1 ) {
                        dp[i][j] = [dp[i-1][j][0]+1, 1];
                    } 
                }
            } else if(arr[i] < arr[j]) { //감소 상태.
                if(dp[i][j][0] < dp[i-1][j][0] +1 ) {
                    dp[i][j] = [dp[i-1][j][0] +1, 2];
                }
            }
             if(dp[i][j][0] > answer) answer = dp[i][j][0];
        }
       
        // console.log(dp[i].slice(0, N+1)+"\n");
    }
    // console.log(dp[N-1])
    console.log(answer)
}

Solution();