const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

// n, a, b를 입력받습니다.
const n = Number(input[0]);

// 문자열의 인덱스를 1부터 시작하게 하기 위해 앞에 공백을 추가합니다.
let a = " " + input[1];
let b = " " + input[2];

// dp 배열을 초기화합니다. 초기값은 INF로 설정합니다.
const INF = Number.MAX_SAFE_INTEGER;
let dp = Array.from(Array(10005), () => Array(10).fill(INF));

// 초기 상태를 설정합니다.
dp[0][0] = 0;

// 동적 프로그래밍을 통해 문제를 해결합니다.
// dp[i][j] :: i번째 마법진까지 맞춰졌을 때, 현재 j번 반시계 방향으로 회전한 형태일 때 회전의 최소 횟수
for (let i = 0; i < n; i++) {
    for (let j = 0; j < 10; j++) {
        if (dp[i][j] === INF) {
            continue;
        }

        const cur = (Number(a[i + 1]) + j) % 10;
        const target = Number(b[i + 1]);

        // 반시계 방향 회전의 비용을 계산하고 dp 값을 갱신합니다.
        let cost = (target - cur + 10) % 10;
        let nj = (j + cost) % 10;
        dp[i + 1][nj] = Math.min(dp[i + 1][nj], dp[i][j] + cost);

        // 시계 방향 회전의 비용을 계산하고 dp 값을 갱신합니다.
        cost = (cur - target + 10) % 10;
        nj = j;
        dp[i + 1][nj] = Math.min(dp[i + 1][nj], dp[i][j] + cost);
    }
}

// 최종 결과를 계산합니다.
let ans = INF;
    for (let j = 0; j <= 9; j++) 
        ans = Math.min(ans, dp[n][j]);

// 결과를 출력합니다.
console.log(ans);