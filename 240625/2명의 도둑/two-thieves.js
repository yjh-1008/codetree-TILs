const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

// 변수 선언 및 입력
const [n, m, c] = input[0].split(' ').map(Number);
const weight = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));

// bestVal[sx][sy] : (sx, sy) ~ (sx, sy + m - 1)까지 물건을
//                    잘 골라 얻을 수 있는 최대 가치를 preprocessing
//                    때 저장해놓을 배열입니다.
const bestVal = Array.from(Array(n), () => Array(n).fill(0));

let a = [];
let maxVal = 0;

function findMaxSum(currIdx, currWeight, currVal) {
    if (currIdx === m) {
        // 고른 무게들의 합이 c를 넘지 않는 경우에만 갱신합니다.
        if (currWeight <= c) {
            maxVal = Math.max(maxVal, currVal);
        }
        return;
    }
    
    // currIdx index에 있는 숫자를 선택하지 않은 경우
    findMaxSum(currIdx + 1, currWeight, currVal);
    
    // currIdx index에 있는 숫자를 선택한 경우
    // 무게는 a[currIdx] 만큼 늘지만
    // 문제 정의에 의해 가치는 a[currIdx] * a[currIdx] 만큼 늘어납니다.
    findMaxSum(currIdx + 1, currWeight + a[currIdx], currVal + a[currIdx] * a[currIdx]);
}

// (sx, sy) ~ (sx, sy + m - 1) 까지의 숫자들 중 적절하게 골라
// 무게의 합이 c를 넘지 않게 하면서 얻을 수 있는 최대 가치를 반환합니다.
function findMax(sx, sy) {
    // 문제를 a[0] ~ a[m - 1]까지 m개의 숫자가 주어졌을 때
    // 적절하게 골라 무게의 합이 c를 넘지 않게 하면서 얻을 수 있는 최대 가치를
    // 구하는 문제로 바꾸기 위해
    // a 배열을 적절하게 채워넣습니다.
    a = weight[sx].slice(sy, sy + m);
    
    // 2^m개의 조합에 대해 최적의 값을 구합니다.
    maxVal = 0;
    findMaxSum(0, 0, 0);
    return maxVal;
}

// [a, b], [c, d] 이 두 선분이 겹치는지 판단합니다.
function intersect(a, b, c, d) {
    // 겹치지 않을 경우를 계산하여 그 결과를 반전시켜 반환합니다.
    return !(b < c || d < a);
}

// 두 도둑의 위치가 올바른지 판단합니다.
function possible(sx1, sy1, sx2, sy2) {
    // 두 도둑이 훔치려는 물건의 범위가
    // 격자를 벗어나는 경우에는 불가능합니다.
    if (sy1 + m - 1 >= n || sy2 + m - 1 >= n) {
        return false;
    }
    
    // 두 도둑이 훔칠 위치의 행이 다르다면
    // 겹칠 수가 없으므로 무조건 가능합니다.
    if (sx1 !== sx2) {
        return true;
    }
    
    // 두 구간끼리 겹친다면
    // 불가능합니다.
    if (intersect(sy1, sy1 + m - 1, sy2, sy2 + m - 1)) {
        return false;
    }
    
    // 행이 같으면서 구간끼리 겹치지 않으면
    // 가능합니다.
    return true;
}

// preprocessing 과정입니다.
// 미리 각각의 위치에 대해 최적의 가치를 구해 bestVal 배열에 저장해놓습니다.
for (let sx = 0; sx < n; sx++) {
    for (let sy = 0; sy < n; sy++) {
        if (sy + m - 1 < n) {
            bestVal[sx][sy] = findMax(sx, sy);
        }
    }
}

// 첫 번째 도둑은 (sx1, sy1) ~ (sx1, sy1 + m - 1) 까지 물건을 훔치려 하고
// 두 번째 도둑은 (sx2, sy2) ~ (sx2, sy2 + m - 1)까지의 물건을
// 훔치려 한다고 했을 때 가능한 모든 위치를 탐색해봅니다.
let ans = 0;
for (let sx1 = 0; sx1 < n; sx1++) {
    for (let sy1 = 0; sy1 < n; sy1++) {
        for (let sx2 = 0; sx2 < n; sx2++) {
            for (let sy2 = 0; sy2 < n; sy2++) {
                if (possible(sx1, sy1, sx2, sy2)) {
                    const sum = bestVal[sx1][sy1] + bestVal[sx2][sy2];
                    ans = Math.max(ans, sum);
                }
            }
        }
    }
}

console.log(ans);