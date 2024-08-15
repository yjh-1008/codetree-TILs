const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
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
        return ret
    }

    length() {
        return this.head - this.tail;
    }
} 
const MAX = 1000010
const N = Number(input);
const step = Array(MAX).fill(Number.MAX_SAFE_INTEGER);

function moveable(n) {
    return true
}

function Solution(){
    const q = new Queue();
    q.push(N);
    step[N] = 0;
    while(q.length()) {
        const cur = q.pop();
        // console.log(cur)
        if(cur === 1) continue;
        if(moveable(cur-1) && step[cur-1] > step[cur]+1) {
            step[cur-1] = step[cur]+1
            q.push(cur-1)
        }

        if(moveable(cur+1) && step[cur+1] > step[cur]+1) {
            step[cur+1] = step[cur]+1
            q.push(cur+1)
        }


        if(cur %2 === 0 &&step[cur/2] > step[cur]+1) {
            step[cur/2] = step[cur]+1;
            q.push(cur/2)
        }

         if(cur %3 === 0 && step[cur/3] > step[cur]+1) {
            step[cur/3] = step[cur]+1
            q.push(cur/3)
        }
    }
    console.log(step[1])
}

Solution();


// 286