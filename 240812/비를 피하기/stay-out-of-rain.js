class Queue {
    constructor() {  // 빈 큐 하나를 생성합니다.
        this.q = [];
        this.head = -1; // head는 큐의 가장 첫 원소의 위치 바로 앞을 가리킵니다.
        this.tail = -1; // tail은 큐의 가장 마지막 원소의 위치를 가리킵니다.
    }

    push(item) {  // 큐의 맨 뒤에 데이터를 추가합니다.
        this.q.push(item);
        this.tail++;
    }

    empty() {  // 큐가 비어있으면 true를 반환합니다.
        return (this.head === this.tail);
    }

    size() {  // 큐에 들어있는 데이터 수를 반환합니다.
        return (this.tail - this.head);
    }

    pop() {  // 큐의 맨 앞에 있는 데이터를 반환하고 제거합니다.
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        return this.q[++this.head];
    }

    front() {  // 큐의 맨 앞에 있는 데이터를 제거하지 않고 반환합니다.
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        return this.q[this.head + 1];
    }
}

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

// 변수 선언 및 입력
const [n, h, m] = input[0].split(' ').map(Number);
const a = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));

const sPos = []; // 시작 위치들
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (a[i][j] === 3) sPos.push([i, j]);
    }
}

// bfs에 필요한 변수들 입니다.
const q = new Queue();
const visited = Array.from(Array(n), () => Array(n).fill(false));
// 시작점으로부터 (i, j) 지점에 도달하기 위한 최단거리를 기록합니다.
const step = Array.from(Array(n), () => Array(n).fill(0));

function inRange(x, y) {
    return 0 <= x && x < n && 0 <= y && y < n;
}

// 격자를 벗어나지 않으면서, 벽도 없고, 아직 방문한 적이 없는 곳이라면
// 지금 이동하는 것이 최단거리임을 보장할 수 있으므로 가야만 합니다.
function canGo(x, y) {
    return inRange(x, y) && a[x][y] !== 1 && !visited[x][y];
}

// queue에 새로운 위치를 추가하고 방문 여부를 표시해줍니다.
// 시작점으로 부터의 최단거리 값도 갱신해줍니다.
function push(nx, ny, newStep) {
    q.push([nx, ny]);
    visited[nx][ny] = true;
    step[nx][ny] = newStep;
};

// bfs를 통해 최소 이동 횟수를 구합니다.
function bfs() {
    // queue에 남은 것이 없을 때까지 반복합니다.
    while (!q.empty()) {
        // queue에서 가장 먼저 들어온 원소를 뺍니다.
        const [x, y] = q.pop();

        const dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1];

        // queue에서 뺀 원소의 위치를 기준으로 4방향을 확인해봅니다.
        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            // 아직 방문한 적이 없으면서 갈 수 있는 곳이라면 새로 queue에 넣어줍니다.
            if (canGo(nx, ny)) {
                // 최단 거리는 이전 최단거리에 1이 증가하게 됩니다.
                push(nx, ny, step[x][y] + 1);
            }
        }
    }
}

// 비를 피할 수 있는 공간들을 전부 시작점으로 하는 bfs를 진행합니다.
// 이는 각 사람마다 가장 가까운 쉘터까지의 거리를 단 한번의 bfs로 구할 수 있도록 합니다.
sPos.forEach(([x, y]) => push(x, y, 0));
bfs();

let result = "";
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (a[i][j] !== 2) {
            result += "0 ";
        } else {
            if (!visited[i][j]) {
                result += "-1 ";
            } else {
                result += `${step[i][j]} `;
            }
        }
    }
    result += "\n";
}

console.log(result);