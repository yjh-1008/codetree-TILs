const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

// 변수 선언 및 입력
const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// 주어진 k에 대하여 마름모의 넓이를 반환합니다.
function getArea(k) {
    return k * k + (k + 1) * (k + 1);
}

// 주어진 k에 대하여 채굴 가능한 금의 개수를 반환합니다.
function getNumOfGold(row, col, k) {
    let numOfGold = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (Math.abs(row - i) + Math.abs(col - j) <= k) {
                numOfGold += grid[i][j];
            }
        }
    }
    return numOfGold;
}

let maxGold = 0;

// 격자의 각 위치가 마름모의 중앙일 때 채굴 가능한 금의 개수를 구합니다.
for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
        for (let k = 0; k < 2 * (n - 1) + 1; k++) {
            const numOfGold = getNumOfGold(row, col, k);
            
            // 손해를 보지 않으면서 채굴할 수 있는 최대 금의 개수를 저장합니다.
            if (numOfGold * m >= getArea(k)) {
                maxGold = Math.max(maxGold, numOfGold);
            }
        }
    }
}

console.log(maxGold);