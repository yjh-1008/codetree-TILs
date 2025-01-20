const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

// n, m, k 값을 입력받습니다.
let [n, m, k] = input[0].split(' ').map(Number);

// 초기 상태를 설정합니다.
let dp = Array.from(Array(15), () => 
    Array.from(Array(205), () => 
        Array(205).fill(0)));    

for (let i = 1; i <= m; i++) {
    dp[1][i][i] = 1;
}

// 동적 프로그래밍을 사용하여 각 상태를 계산합니다.
// dp[i][j][k] :: i개의 마법석을 사용하고, 숫자의 합이 j이며, 이중 가장 마지막의 숫자가 k인 가짓수
for (let i = 1; i < n; i++) {
    for (let j = 1; j <= m; j++) {
        for (let k = 1; k <= m; k++) {
            for (let l = 1; l <= k; l++) {
                if (j + l > m) break;
                dp[i + 1][j + l][l] += dp[i][j][k];
                dp[i + 1][j + l][l] = Math.min(dp[i + 1][j + l][l], 10**9);
            }
        }
    }
}

// 최종 결과를 계산하고 출력합니다.
let ans = '';
let curL = 1;
let curM = m;
for (let i = n; i >= 1; i--) {
    while (dp[i][curM][curL] < k) {
        k -= dp[i][curM][curL];
        curL++;
    }

    ans += `${curL} `;
    curM -= curL;
}

console.log(ans);
