const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})

const dp = Array.from({length:N}, () => Array(N).fill(0));
//dp의 정의 r, c의 위치에 방문했을때, 이전까지의 값들 중에서 최댓 값 중 최소값

function moveable(r, c) {
    return r >= 0 && r<N && c>=0 && c<N;
}

// function go(r, c) {
//     if(dp[r][c] !== Number.MAX_SAFE_INTEGER) {
//         return dp[r][c];
//     }

//     let min = arr[r][c];
//     const dr = [1,0];
//     const dc = [0,1];
//     // console.log('here')
//     for(let i=0;i<2;i++) {
//         const nr = dr[i] + r,nc = dc[i]+c;
//         // console.log(nr, nc)
//         if(moveable(nr, nc)) {
//             min = Math.min(dp[r][c], 
//                 Math.max(go(nr, nc), min));
//             console.log(min)
//         }
//     }

//     dp[r][c] = min

//     return dp[r][c];
// }


function Solution() {
    dp[0][0] = arr[0][0]
    for(let i=1;i<N;i++) {
        dp[i][0] = Math.max(dp[i-1][0], arr[i][0]);
    }

     for(let i=1;i<N;i++) {
        dp[0][i] = Math.max(dp[0][i-1], arr[0][i]);
    }
    // go(0,0)
//    const dr = [1,0];
//     const dc = [0,1];
    for(let i=1;i<N;i++) {
        for(let j=1;j<N;j++) {
            dp[i][j] = Math.max(arr[i][j], 
                     Math.min(dp[i-1][j], dp[i][j-1]));
        }
    }

    console.log(dp[N-1][N-1])
}

Solution();