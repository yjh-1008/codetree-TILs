const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((v) => v.split(" ").map(Number));
const dp = Array.from({length: M+1}, () => new Array(N).fill(Number.MIN_SAFE_INTEGER));
function Solution() {
    //dp i번째 날에 j번째 옷을 입었을 때 가치의 최대값

    const isRange = (s, e, cur) => {
        return s <= cur && cur <= e;
    }

    //초기값 설정
    for(let i=0;i<N;i++) {
        const [s, e, v] = arr[i];
        if(isRange(s, e, 1)) {
            dp[1][i] = 0;
        }
    }
    //이전날의 가치 - 현재옷의 가치의 절대값 
    for(let i=2;i<=M;i++) {
        for(let j=0;j<N;j++) {
            const [s, e, v] = arr[j];
            if(isRange(s, e, i)) {
                for(let k=0;k<N;k++) {
                    // if(dp[i-1][k] == ) continue;
                    dp[i][j] = Math.max(dp[i][j], dp[i-1][k] + Math.abs(arr[k][2] - v)) 
                }
            }
        }
    }

    let ans = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i <= n; i++)
    ans = Math.max(ans, dp[m][i]);

    console.log(ans);
    
}

Solution()