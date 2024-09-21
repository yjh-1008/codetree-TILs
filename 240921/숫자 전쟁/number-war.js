//상대보다 카드의 수가 작다면 그 점수를 얻고 카드를 버림
//둘 중 한명의 카드가 소진될 때까지 반복
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = +input[0];
const p1 = [0,...input[1].split(" ").map(Number)]
const p2 = [0,...input[2].split(" ").map(Number)]
const MAX_TURN = N+1
const dp = Array.from({length:MAX_TURN}, () => Array(MAX_TURN).fill(-1));
const Solution = () => {
    dp[0][0] = 0;

    //2. 남우가 낸 카드
    //3. 상대방이 낸 카드

    //남우가 i카드를 내고, 상대방이 j카드를 냈을때의 최대값.
    //남우가 버린 카드와, 상대방이 버린 카드를 체크하는 로직 필요.
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(dp[i][j] == -1) continue;
            if(p1[i + 1] < p2[j + 1]){
                dp[i+1][j] = Math.max(dp[i][j], dp[i+1][j]);
            }
            if(p1[i + 1] > p2[j + 1]){
                dp[i][j+1] = Math.max(dp[i][j] + p2[j + 1], dp[i][j+1]);
            }
            dp[i+1][j+1] = Math.max(dp[i][j], dp[i+1][j+1]);

            // dp[i][j] = Math.max(dp[i-1][j-1], dp[i][j])
        }
        // console.log(dp[i]);
    }
    let ans = 0;
    for (let i = 0; i <= N; i++) {
        ans = Math.max(ans, dp[i][N]);
        ans = Math.max(ans, dp[N][i]);
    }
    
    console.log(ans);
}

Solution();