const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})
const dp = Array.from({length:N}, () => Array(M).fill(-1));
let answer = -1;

function go(r, c) {

    for(let i=r+1;i<N;i++) {
        for(let j=c+1;j<M;j++) {
            if(arr[r][c] < arr[i][j] && dp[r][c]+1 > dp[i][j]) {
                dp[i][j] = dp[r][c]+1;
                go(i, j);
            }
        }
    }
}

function Solution() {
    dp[0][0] = 1;

    //한칸 아래, 한칸 오른쪽
    go(0,0);

    for(let i=0;i<N;i++) {
        for(let j=0;j<M;j++) {
            if(answer < dp[i][j]) answer = dp[i][j]
        }
    }

    console.log(answer)
}

Solution();