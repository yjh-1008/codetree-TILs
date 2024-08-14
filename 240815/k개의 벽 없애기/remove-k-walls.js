const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,K] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length-2).map(item => item.split(" ").map(Number));
const [sr, sc] = input[input.length-2].split(" ").map((v) => v-1);
const [er, ec] = input[input.length-1].split(" ").map((v) => v-1);
const walls = [];
class Queue {
    constructor() {
        this.arr = [];
        this.head = 0;
        this.tail = 0;
    }

    push(val) {
        this.arr[this.head++] = val;
    }

    pop() {
        const ret= this.arr[this.tail++];
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


function moveable(r, c) {
    return r>=0 && r<N && c>=0 && c<N;
}
let ret = Number.MAX_SAFE_INTEGER;
function bfs(visited) {
    const dr = [-1,1,0,0];
    const dc = [0,0,-1,1];

    const q = new Queue();
    const step = Array.from({length:N}, () => Array(N).fill(Number.MAX_SAFE_INTEGER));
    q.push([sr, sc]);
    visited[sr][sc] = true;
    step[sr][sc] = 0;
    // console.log(visited);
    while(q.length()) {
        const [r, c] = q.pop();
        for(let i=0;i<4;i++) {
            const nr = dr[i]+r, nc = dc[i]+c;
            if(moveable(nr, nc) && !visited[nr][nc]) {
                visited[nr][nc] = true;
                step[nr][nc] = Math.min(step[nr][nc], step[r][c]+1);
                q.push([nr, nc]);
            }
        }
    }

    ret = Math.min(ret, step[er][ec]);
}




function go(tmp, idx) {
    if(tmp.length === K) {
        const visited = Array.from({length:N}, () => Array(N).fill(false));
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                const chk = tmp.find((item) => item[0] === i && item[1] === j);
                // console.log(chk)
                if(arr[i][j] === 1 && chk) visited[i][j] = false;
                else if(arr[i][j] === 1 && !chk) visited[i][j] = true;
            }
        }
        bfs(visited);
        
        return;
    }

    if(idx >= walls.length) return;



    tmp.push(walls[idx]);
    go(tmp, idx+1);
    tmp.pop();
    go(tmp, idx+1);
    return;
}

function Solution() {
    // console.log(arr);
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            // console.log(i,j, arr[i][j])
            if(arr[i][j] === 1) walls.push([i,j]);
        }
    }


    go([], 0);
    console.log(ret === Number.MAX_SAFE_INTEGER ? -1: ret);
}

Solution();