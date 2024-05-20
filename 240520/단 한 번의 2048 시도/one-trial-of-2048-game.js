const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const grid = input.slice(0, 4).map(line => line.trim().split(' ').map(Number));
const dirChar = input[4];

// 변수 선언 및 입력
const NONE = -1;
const n = 4;
const nextGrid = Array.from(Array(n), () => Array(n).fill(0));

// grid를 시계방향으로 90' 회전시킵니다.
function rotate() {
    // nextGrid를 0으로 초기화합니다.
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            nextGrid[i][j] = 0;

    // 90' 회전합니다.
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            nextGrid[i][j] = grid[n - j - 1][i];
    

    // nextGrid를 grid에 옮겨줍니다.
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            grid[i][j] = nextGrid[i][j];
};

// 아래로 숫자들을 떨어뜨립니다.
function drop() {
    // nextGrid를 0으로 초기화합니다.
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            nextGrid[i][j] = 0;

    // 아래 방향으로 떨어뜨립니다.
    for (let j = 0; j < n; j++) {
        // 같은 숫자끼리 단 한번만
        // 합치기 위해 떨어뜨리기 전에
        // 숫자 하나를 keep해줍니다.
        let keepNum = NONE, nextRow = n - 1;

        for (let i = n - 1; i >= 0; i--) {
            if (!grid[i][j]) continue;

            // 아직 떨어진 숫자가 없다면, 갱신해줍니다.
            if (keepNum === NONE)
                keepNum = grid[i][j];

            // 가장 최근에 관찰한 숫자가 현재 숫자와 일치한다면
            // 하나로 합쳐주고, keep 값을 비워줍니다.
            else if (keepNum === grid[i][j]) {
                nextGrid[nextRow--][j] = keepNum * 2;
                keepNum = NONE;
            } 

            // 가장 최근에 관찰한 숫자와 현재 숫자가 다르다면
            // 최근에 관찰한 숫자를 실제 떨어뜨려주고, keep 값을 갱신해줍니다.
            else {
                nextGrid[nextRow--][j] = keepNum;
                keepNum = grid[i][j];
            }
        }

        // 전부 다 진행했는데도 keep 값이 남아있다면
        // 실제로 한번 떨어뜨려줍니다.
        if (keepNum !== NONE)
            nextGrid[nextRow--][j] = keepNum;
    }

    // nextGrid를 grid에 옮겨줍니다.
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            grid[i][j] = nextGrid[i][j];
};

// move_dir 방향으로 기울이는 것을 진행합니다.
// 회전을 규칙적으로 하기 위해
// 아래, 오른쪽, 위, 왼쪽 순으로 dx, dy 순서를 가져갑니다.
function tilt(moveDir) {
    // Step 1.
    // move_dir 횟수만큼 시계방향으로 90'회전하는 것을 반복하여
    // 항상 아래로만 숫자들을 떨어뜨리면 되게끔 합니다.
    for (let i = 0; i < moveDir; i++)
        rotate();

    // Step 2.
    // 아래 방향으로 떨어뜨립니다.
    drop();

    // Step 3.
    // 4 - move_dir 횟수만큼 시계방향으로 90'회전하는 것을 반복하여
    // 처음 상태로 돌아오게 합니다. (총 360' 회전)
    for (let i = 0; i < 4 - moveDir; i++)
        rotate();
};

// 아래, 오른쪽, 위, 왼쪽 순으로 
// mapper를 지정합니다.
const dirMapper = {
    'D': 0,
    'R': 1,
    'U': 2,
    'L': 3
};

// 기울입니다.
tilt(dirMapper[dirChar]);

for (let i = 0; i < n; i++)
    console.log(grid[i].join(" "));