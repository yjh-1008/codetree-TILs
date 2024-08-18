const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})
const dp = Array.from({length:N}, () => Array(N).fill(Number.MAX_SAFE_INTEGER));
//최소값들 중 최대값을 찾는 문제.
//각 영역에서 갈 수 있는 길 중 최소값을 찾는다.
//그 영역들 중 최대값을 찾는다.
function Solution() {
    dp[0][0] = arr[0][0]
    // for(let i=0;i<N;i++) {
    //     for(let j=0;j<N;j++) dp[i][j] = arr[i][j]
    // }

    for(let i=1;i<N;i++) {
        dp[i][0] = Math.min(dp[i-1][0], arr[i][0]);
    }

    for(let i=1;i<N;i++) {
        dp[0][i] = Math.min(dp[0][i-1], arr[0][i]);
    }
    
    function movealbe(r, c) {
        return r >= 0 && r < N && c>=0 && c<N;
    }

    const dr = [-1,0];
    const dc = [0,-1];
    for(let i=1;i<N;i++) {
        for(let j=1;j<N;j++) {
            for(let t = 0;t<2;t++) {
                const nr = dr[t] + i, nc = dc[t]+j;
                if(movealbe(nr, nc) ) {
                    dp[i][j] = Math.min(arr[i][j], dp[nr][nc])
                }

                
            }
        }
    }

    // console.log(dp)
    console.log(dp[N-1][N-1])

}

Solution();