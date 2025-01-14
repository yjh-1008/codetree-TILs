//비슷하 수열: 순서대로 읽었을때, 인접한 두 숫자가 다른 횟수가 M번 이하
//유사도: 같은 위치에 같은 원소가 나온 횟수

//비슷한수열일때, 유사도가 높은 수열 => 인접한 두 숫자가 다른 횟수가 M번 이하인 수열 중에서 유사도가 가장 높은 수열의 개수

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const dp = Array.from({length: N+1}, () => Array.from({length:5}, ()=> new Array(M+1).fill(Number.MIN_SAFE_INTEGER)));

function Solution() {
    //초기 유사도
   dp[0][nums[0]][0] = 1;
    // console.log(N, M)
   for(let i=1;i<N;i++) {
        for(let j=1;j<=4;j++) {
            for(let q=1;q<=4;q++) {
                for(let k=0;k<=M;k++) {
          
                    dp[i][j][k] = Math.max(dp[i][j][k], dp[i-1][j][k])
                    //비슷한 수열인지 확인
                    if(j == nums[i] && dp[i-1][j][k] != Number.MIN_SAFE_INTEGER) {
                        //유사도 검사
                        dp[i][j][k] = Math.max(dp[i][j][k], dp[i-1][j][k]+1);
                    } else {
                        if(k > 0) {
                            if(dp[i-1][q][k-1] != Number.MIN_SAFE_INTEGER) {
                                dp[i][nums[i]][k] = Math.max(dp[i][nums[i]][k], dp[i-1][q][k-1]+1)
                            }
                        }
                    }
                }
            }   
        }
   }

   let max = 0;
//    console.log(dp[N-1])
    for(let i=1;i<=4;i++) {
        for(let j=0;j<=M;j++) {
            if(dp[N-1][i][j] > 0) max = Math.max(max, dp[N-1][i][j]);
        }
    }
    console.log(max)
}

Solution();