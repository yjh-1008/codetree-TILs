const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const EMPTY = [0, 0, 0];

const dirMapper = {
    'U': 0,
    'R': 1,
    'L': 2,
    'D': 3,
}

// 변수 선언 및 입력:
const [n, m, t] = input[0].split(' ').map(Number);
const grid = Array.from(Array(n + 1), () => Array(n + 1).fill(EMPTY));
const nextGrid = Array.from(Array(n + 1), () => Array(n + 1).fill(EMPTY));

function inRange(x, y) {
    return 0 <= x && x < n && 0 <= y && y < n;
}

function nextPos(x, y, moveDir) {
    // 방향 전환을 쉽게 하기 위해 
    // dx, dy 테크닉에서 0<->3, 1<->2가
    // 서로 반대 방향이 되도록 정의합니다.
    const dxs = [-1, 0, 0, 1];
    const dys = [0, 1, -1, 0];

    let nx = x + dxs[moveDir];
    let ny = y + dys[moveDir];

    // 벽에 부딪히게 된다면, 방향만 전환해줍니다.
    if (!inRange(nx, ny)) {
        moveDir = 3 - moveDir;
    } 
    // 그렇지 않다면, 한 칸 전진합니다.
    else {
        x = nx;
        y = ny;
    }

    return [x, y, moveDir];
}

// (x, y) 위치에 새로운 구슬이 들어왔을 때 갱신을 진행합니다.
function update(x, y, newMarble) {
    // 기존 구슬 정보입니다.
    let [num, weight, moveDir] = nextGrid[x][y];

    // 새롭게 들어온 구슬 정보입니다.
    let [newNum, newWeight, newDir] = newMarble;

    // 새로 들어온 구슬이 더 우선순위가 높다면
    // 번호와 방향은 새로운 구슬을 따르게 됩니다.
    if (newNum > num)
        nextGrid[x][y] = [newNum, weight + newWeight, newDir];
    // 기존 구슬의 우선순위가 더 높다면
    // 무게만 더해집니다.
    else
        nextGrid[x][y] = [num, weight + newWeight, moveDir];
}

function move(x, y) {
    let [num, weight, moveDir] = grid[x][y];

    // Step1. 현재 구슬의 다음 위치와 방향을 구합니다.
    let [nx, ny, nextDir] = nextPos(x, y, moveDir);

    // Step2. 구슬을 옮겨줍니다.
    update(nx, ny, [num, weight, nextDir]);
}

function simulate() {
    // Step1. nextGrid를 초기화합니다.
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            nextGrid[i][j] = EMPTY;
        }
    }

    // Step2. 각 구슬들을 한 칸씩 움직여줍니다.
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== EMPTY) {
                move(i, j);
            }
        }
    }

    // Step3. nextGrid 값을 grid로 옮겨줍니다.
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            grid[i][j] = nextGrid[i][j];
        }
    }
}

function getMarbleNum() {
    let cnt = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== EMPTY) {
                cnt += 1;
            }
        }
    }
    return cnt;
}

function getMaxWeight() {
    let maxWeight = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== EMPTY) {
                const [index, weight, direction] = grid[i][j];
                maxWeight = Math.max(maxWeight, weight);
            }
        }
    }
    return maxWeight;
}

for (let i = 1; i <= m; i++) {
    let [r, c, d, w] = input[i].split(' ');

    [r, c, w] = [r, c, w].map(Number);
    d = dirMapper[d];

    grid[r - 1][c - 1] = [i, w, d];
}

// t초에 걸쳐 시뮬레이션을 진행합니다.
for (let i = 1; i <= t; i++)
    simulate();

const marbleNum = getMarbleNum();
const maxWeight = getMaxWeight();
console.log(marbleNum, maxWeight);