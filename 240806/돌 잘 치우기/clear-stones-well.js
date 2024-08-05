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
const [n, k, m] = input[0].split(' ').map(Number);
const a = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

let ans = 0;
const sPos = [];
const stonePos = [];
const selectedStones = [];

// bfs에 필요한 변수들 입니다.
const q = new Queue();
const visited = Array.from(Array(n), () => Array(n).fill(false));

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (a[i][j] === 1) {
            stonePos.push([i, j]);
        }
    }
}

input.slice(1 + n).map(line => line.split(' ').map(Number)).forEach(([r, c]) => {
    sPos.push([r - 1, c - 1]);
});

function inRange(x, y) {
    return 0 <= x && x < n && 0 <= y && y < n;
}

function canGo(x, y) {
    return inRange(x, y) && a[x][y] === 0 && !visited[x][y];
}

function bfs() {
    // queue에 남은 것이 없을때까지 반복합니다.
    while (!q.empty()) {
        // queue에서 가장 먼저 들어온 원소를 뺍니다.
        const [x, y] = q.pop();

        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];

        // queue에서 뺀 원소의 위치를 기준으로 4방향을 확인해봅니다.
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            // 아직 방문한 적이 없으면서 갈 수 있는 곳이라면
            // 새로 queue에 넣어주고 방문 여부를 표시해줍니다.
            if (canGo(nx, ny)) {
                q.push([nx, ny]);
                visited[nx][ny] = true;
            }
        }
    }
}

function calc() {
    selectedStones.forEach(([x, y]) => {
        a[x][y] = 0;
    });

    for (let i = 0; i < n; i++) {
        visited[i].fill(false);
    }

    // k개의 시작점을 queue에 넣고 시작합니다.
	// BFS는 여러 시작점에서 시작하여
    // 이동 가능한 칸을 전부 탐색하는 것이 가능합니다.
    sPos.forEach(([x, y]) => {
        q.push([x, y]);
        visited[x][y] = true;
    });

    bfs();

    selectedStones.forEach(([x, y]) => {
        a[x][y] = 1;
    });

    let cnt = 0;
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (visited[i][j]) cnt++;

    return cnt;
}

function findMax(idx, cnt) {
     if (idx === stonePos.length) {
        if (cnt === m) {
            ans = Math.max(ans, calc());
        }
        return;
    }

    selectedStones.push(stonePos[idx]);
    findMax(idx + 1, cnt + 1);
    selectedStones.pop();

    findMax(idx + 1, cnt);
}

findMax(0, 0);
console.log(ans);