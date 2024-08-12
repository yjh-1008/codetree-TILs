//0은 이동가능, 1은 벽, 2는 사람 3은 피할수있는곳,
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n")
const [n,h,m] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.split(" ").map(Number));

class Queue {
    constructor() {
        this.q = [];
        this.head = 0;
        this.tail = 0;
    }

    push(val) {
        this.q[this.head++] = val;
    }

    pop() {
        const ret = this.q[this.tail++];
        if(this.head === this.tail) {
            this.head = 0;
            this.tail = 0;
        }

        return ret;
    }

    length() {
        return this.head - this.tail;
    }
}
const visited = Array.from({length:n} ,() => Array(n).fill(false));
const step = Array.from({length:n} ,() => Array(n).fill(0));

function isRange(r,c) {
    return r >= 0 && r<n && c>=0 && c<n;
}

function moveable(r, c) {
    return isRange(r, c) && arr[r][c] !== 1;
}


function bfs(q) {
    const dr = [-1,1,0,0];
    const dc = [0,0,-1,1];
    while(q.length()) {
        const [r, c] = q.pop();
        for(let i=0;i<4;i++) {
            const nr = dr[i]+r, nc = dc[i]+c;
            if(moveable(nr, nc)) {
                if(!visited[nr][nc])  {
                    visited[nr][nc] = true;
                    step[nr][nc] = step[r][c]+1;
                    q.push([nr, nc]);
                }
            }
        }
    }
}


function Solution() {
    const q = new Queue();
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(arr[i][j] === 3) q.push([i,j]); 
        }
    }

    bfs(q);
    // console.log(visited);
    let result = "";
    for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (arr[i][j] !== 2) {
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
}

Solution();