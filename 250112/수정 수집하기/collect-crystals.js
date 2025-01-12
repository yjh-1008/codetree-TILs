//수정이 떨어지기 전에 최대, k번 이동해야한다.
//이때 최대 수정의 개수를 구하라.
//n : 수정이 생성되는 횟수, k: 움직일 수 있는 횟수.
//n자리의 문자열(L or R)

//dp : n번째에 왼쪽, 오른쪽으로 k번 이동했을때 얻을 수 있는 수정의 최대값.

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split("\n");
const L = 'L', R='R';
const [N, K] = input[0].split(" ").map(Number);
const strs = input[1].split("");

const dp = Array.from(new Array(N+1), () => {
    return Array.from(new Array(K+1), () => {
        return Array(2).fill(0);
    });
})



function Solution() {
    //초기값 셋팅
    const isLeft = strs[0] === L;
    if(isLeft) {
        dp[0][0][0] = 1;
        dp[0][1][1] = 0;
    } else {
        dp[0][0][0] = 0;
        dp[0][1][1] = 1; 
    }
    //n번째에 k만큼 움직여서 도착한 위치.
    //1번째에 0번 움직여서 L에 왔다. => 1, 0, 0
    //Math.max(0번째 왼쪽, 0번째 오른쪽)
    for(let n=0;n<N-1;n++) {
        for(let k=0;k<=K;k++) {
            for(let j=0;j<2;j++) {
                const next = strs[n+1];
                const nextJ = next === 'L' ? 0 : 1;
                if(nextJ === j) {
                    dp[n+1][k][j] = Math.max(dp[n+1][k][j], dp[n][k][j]+1);
                } else {
                     dp[n+1][k][j] = Math.max(dp[n+1][k][j], dp[n][k][j]);
                    if(k+1 <= K) {
                        dp[n+1][k+1][j] = Math.max(dp[n+1][k+1][j], dp[n][k][nextJ]+1);
                    }
                }
            }
        }
    }
    let result = 0;
    for(let k=0;k<=K;k++) {
        for(let j=0;j<2;j++) {
            result = Math.max(result, dp[N-1][k][j]);
        }
    }
    // console.log(dp)
    console.log(result)
}

Solution();