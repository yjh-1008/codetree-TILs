const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k, m] = input.shift().split(" ").map(Number);
const grid = input.slice(0, n).map((e) => e.split(" ").map(Number));
const startPositions = input
  .slice(n)
  .map((e) => e.split(" ").map((num) => +num - 1));

const [dx, dy] = [
  [0, 1, 0, -1],
  [1, 0, -1, 0],
];

const q = [];
let selectedStones = [];
const stonePositions = [];
let visited = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => false)
);
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (grid[i][j] === 1) stonePositions.push([i, j]);
  }
}

function bfs() {
  while (q.length) {
    let [x, y] = q.shift();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        !grid[nx][ny] &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        q.push([nx, ny]);
      }
    }
  }
}

function getVisitedNum() {
  // 돌을 제거
  for (let i = 0; i < m; i++) {
    let [x, y] = selectedStones[i];
    grid[x][y] = 0;
  }

  //visited 초기화
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = false;
    }
  }

  // 시작점 queue에 넣기
  for (let i = 0; i < startPositions.length; i++) {
    let [x, y] = startPositions[i];
    q.push([x, y]);
  }

  // bfs로 탐색
  bfs();

  // 돌을 다시 표시
  for (let i = 0; i < selectedStones.length; i++) {
    let [x, y] = selectedStones[i];
    grid[x][y] = 1;
  }

  // 도달한 칸의 수 세기
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) cnt += 1;
    }
  }

  return cnt;
}

const selectedStonesIdx = [];
const idxArr = Array.from({ length: m }, () => 0);

function getSelectedStonesIdx(L, idx) {
  if (L === m) {
    selectedStonesIdx.push([...idxArr]);
    return;
  }

  for (let i = idx; i < stonePositions.length; i++) {
    idxArr[L] = i;
    getSelectedStonesIdx(L + 1, i + 1);
  }
}


getSelectedStonesIdx(0, 0);

for (let i = 0; i < selectedStonesIdx.length; i++) {
  for (let j = 0; j < selectedStonesIdx[i].length; j++) {
    selectedStones.push(stonePositions[selectedStonesIdx[i][j]]);
  }
  answer = Math.max(answer, getVisitedNum());
  selectedStones = [];
}

console.log(answer);