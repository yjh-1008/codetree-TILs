//n개의 마법석
//이전 마법석의 숫자보다 크거나 같아야함
//모든 숫자의 합은 m
// 규칙을 따른 수열 중 k번째 수열
//n번째 에서 I를 골랐을때 올 수 있는 

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim()

const [N, M,K] = input.split(" ").map(Number);

const dp = Array.from({length:N}, () => {
    return Array.from({length:M+1}).fill([])
})


function Solution() {
    for(let i=1;i<=M;i++) {
        dp[0][i].push([i]);
    }

    for(let i=0;i<N-1;i++) {
        for(let j=1;j<=M;j++) {
            for(let k=0;k<dp[i][j].length;k++) {
                const tmp = dp[i][j][k];
                const sum = tmp.reduce((pev, cur) => cur += pev, 0);
                for(let q=tmp.at(-1);q<=M;q++) {
                    if(sum+q > M) continue;
                    if(i == N-2 && sum + q != M) continue;
                    // console.log(sum+q)
                    dp[i+1][sum+q].push([...tmp, q]);
                }
            }
            dp[i][j] = []
        }
    }
    // console.log(dp[N-1])
    let cnt = 0;
    for(let i=0;i<=M;i++) {
        for(let j=0;j<dp[N-1][i].length;j++) {
            if(cnt+1 == K) {
                console.log(dp[N-1][i][j].join(" "));
                return;
            }
            cnt++
        }
    }
    // console.log(4/2)
}

Solution();