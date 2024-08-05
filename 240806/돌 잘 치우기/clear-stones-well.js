const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n, k, m] = input[0].split(" ").map(Number);
const arr = input.slice(1, n+1).map(item => item.split(" ").map(Number));

// const [sr, sc] = input[input.length-2].split(" ").map(Number);


class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  // 큐에 요소 추가
  push(element) {
    this.items[this.tail] = element;
    this.tail++;
  }

  // 큐에서 요소 제거
  pop() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    const item = this.items[this.head];
    this.head++;
    return item;
  }

  // 큐의 맨 앞 요소 확인
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[this.head];
  }

  // 큐가 비어 있는지 확인
  isEmpty() {
    return this.tail === this.head;
  }

  // 큐의 길이 확인
  length() {
    return this.tail - this.head;
  }

  // 큐를 초기화하거나 모든 요소를 제거
  clear() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }
}

function fillVisited() {
    const visited = Array.from({length:n}, () => Array(n).fill(false));
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(arr[i][j] === 1) visited[i][j] = true;
        }
    }
    return visited;
}

const dr = [-1,1,0,0];
const dc = [0,0,-1,1];

function moveable(r, c) {
    if(r<0 || r>=n ||c<0|| c>=n) return false;
    return true;
}
let ret = Number.MIN_VALUE;
function Solution() {
    for(let i=input.length-2; i<input.length;i++) {
        const [sr, sc] = input[i].split(" ").map((v) =>v-1);
        const visited = fillVisited();
        const q = new Queue();
        visited[sr][sc] = true;
        q.push([sr, sc, 0, 0]);
        while(q.length()) {
            // console.log(q.q)
            const [r, c, s, cnt] = q.pop();
            // console.log(r, c, cnt, i);
            // if(s > )
            for(let i=0;i<4;i++) {
                const nr = dr[i]+r, nc = dc[i]+c;
                if(!moveable(nr, nc) || visited[nr][nc]) continue;
                if(cnt > n*n-1) break;
                if(s >= k) {
                    ret = Math.max(cnt, ret);
                    // continue;
                }
                visited[nr][nc] = true;
                q.push([nr, nc, s+1, cnt+1]);
                      visited[nr][nc] = false;
            }
        }
    }
    console.log(ret)
    // 어떤 돌을 치웠을때 가장 적절하게 치운걸까?
    // go(0,0, cnt);
}

Solution();