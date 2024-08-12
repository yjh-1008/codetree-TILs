const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const [sr, sc, er, ec] = input[1].split(" ").map((v) => Number(v)-1);

const moves = [
    [-2,-1],
    [-2,1],
    [-1,2],
    [2,2],
    [1,2],
    [2,1],
    [2,-1],
    [1,-2],
    [-1,-2]
]

class Queue {
    constructor() {
        this.q = [];
        this.head = 0;
        this.tail = 0
    }

    push(val) {
        this.q[this.tail++] = val;
    }

    pop() {
        const ret = this.q[this.head++];
        if(this.head === this.tail) {
            this.head = 0;
            this.tail = 0;
        }

        return ret;
    }

    length() {
        return this.tail - this.head;
    }
}
const visited = Array.from({length:N},() => Array(N).fill(false));
const step = Array.from({length:N},() => Array(N).fill(Number.MAX_SAFE_INTEGER));


function moveable(r, c) {
    if(r < 0 || r>=N||c<0 || c>=N) return false;
    return true;
}

function Solution(){
    const q = new Queue();
    q.push([sr, sc]);
    visited[sr][sc] = true;
    step[sr][sc] = 0;

    while(q.length()) {
        const [r, c] = q.pop();
        moves.forEach((move) => {
            const [mr, mc] = move;
            const nr = mr+r, nc = mc+c;
            if(moveable(nr, nc)) {
                if(step[r][c]+1 < step[nr][nc]) {
                    step[nr][nc] = step[r][c] + 1;
                    q.push([nr, nc]);
                }
            }
        })
    }
    console.log(step[er][ec] === Number.MAX_SAFE_INTEGER ? -1 : step[nr][nc]);
}

Solution();