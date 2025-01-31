const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const INT_MIN = Number.MIN_SAFE_INTEGER;

// 변수 선언 및 입력
const [n, m] = input[0].trim().split(' ').map(Number);
const s = Array(n + 1).fill(0);
const e = Array(n + 1).fill(0);
const v = Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
    [s[i], e[i], v[i]] = input[i].trim().split(' ').map(Number);
}

// dp[i][j] :
// i번째 날까지 입을 옷을 전부 결정했고
// 마지막 날에 입은 옷이 j번 옷이라 했을 때,
// 얻을 수 있는 최대 만족도
const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

function initialize() {
    // 최댓값을 구하는 문제이므로, 
    // 초기에는 전부 INT_MIN을 넣어줍니다.
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = INT_MIN;
        }
    }

    // 첫 날에 옷을 입는 경우를 초기 조건으로 설정합니다.
    // 첫 번째 날에 입을 수 있는 옷들에 대해서만 가능하며,
    // j번째 옷을 첫 번째 날에 입는다면
    // 위치 1까지 고려했을 때, 마지막 날에 입은 옷이 j번 옷이 되고,
    // 만족도는 화려함의 차이로 결정되므로 초기 만족도 값은 0 이므로 
    // dp[1][j] = 0이 초기 조건이 됩니다. 

    for (let j = 1; j <= n; j++) {
        if (s[j] === 1) {
            dp[1][j] = 0;
        }
    }
}

initialize();

for (let i = 2; i <= m; i++) {
    // i번째 날까지 입을 옷을 전부 결정했고
    // 마지막 날에 입은 옷이 j번 옷이라 했을 때,
    // 얻을 수 있는 최대 만족도를 계산합니다.

    for (let j = 1; j <= n; j++) {
        for (let k = 1; k <= n; k++) {
            // i - 1번째 날에 k번 옷을 입은 경우를 고려해봅니다.
            // 단, k번 옷이 i - 1번째 날에 입을 수 있었어야 하고
            // j번 옷이 i번째 날에 입을 수 있는 경우에만 고려해볼 수 있습니다.
            // 이 상황에서의 최대 만족도를 의미하는 dp[i - 1][k] 값에
            // 새롭게 얻게 되는 만족도는 두 옷의 화려함의 차이이므로
            // |v[j] - v[k]|를 더한 값이 하나의 선택지가 될 수 있습니다.

            if (s[k] <= i - 1 && i - 1 <= e[k] && s[j] <= i && i <= e[j]) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][k] + Math.abs(v[j] - v[k]));
            }
        }
    }
}

// m번째 날짜까지 전부 입을 옷을 결정했을 때,
// 마지막 날에 입은 옷이 j번 옷인 경우 중
// 가장 높은 만족도를 얻을 수 있는 경우를 선택합니다.

let ans = INT_MIN;
for (let i = 1; i <= n; i++)
    ans = Math.max(ans, dp[m][i]);

console.log(ans);