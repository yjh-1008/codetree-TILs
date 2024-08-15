const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,K] = input[0].split(" ").map(Number);
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
const arr = input.slice(1, input.length).map((item) => {
    return item.split(" ").map(Number);
})

const step = Array.from({length:N}, () => Array(N).fill(Number.MAX_SAFE_INTEGER));

function moveable(r, c) {
    return r>= 0 && r<N && c>=0 && c<N;
}

function Solution() {
    const q = new Queue();
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(arr[i][j] === 0) step[i][j] = -1;
            else if(arr[i][j] === 2) {
                q.push([i,j]);
                step[i][j] = 0;
            }
        }
    }

    const dr = [-1,1,0,0];
    const dc = [0,0,-1,1];
    // console.log(step)
    while(q.length()) {
        const [r, c] = q.pop();
        for(let i = 0;i<4;i++) {
            const nr = dr[i]+r, nc = dc[i]+c;
            if(moveable(nr, nc) && step[nr][nc] === Number.MAX_SAFE_INTEGER) {
                step[nr][nc] = step[r][c]+1
                q.push([nr, nc])
            }
        }
    }
    
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(step[i][j]=== Number.MAX_SAFE_INTEGER) step[i][j] = -2;
        }
    }

    step.forEach((item) => console.log(item.join(" ").trim()))
}

Solution();