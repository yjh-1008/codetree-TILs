const MAX = 10000;
class Queue {
    constructor() {
        this.q = [];
        this.head = -1;
        this.tail = -1;
    }

    push(item) {
        this.q.push(item);
        this.tail = this.tail+1;
    }

    empty() {
        return (this.head === this.tail) ? 1 : 0;
    }

    size() {
        return this.tail - this.head;
    }

    pop() {
        if(this.empty()) {
            throw new Error("empty");
        }
        return this.q[++this.head];
    }

    front() {
        return this.q[this.head+1];
    }
}

const fs = require('fs');
let input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
input = input.slice(1)

const Solution = () => {
    const queue = new Queue();
    const ret = [];
    for(let i=0;i<N;i++) {
        const [cmd, n] = input[i].split(" ");
        if(cmd === 'push') {
            queue.push(n);
        } else if(cmd === 'pop') {
            ret.push(queue.pop());
        } else if(cmd === 'size') {
            ret.push(queue.size());
        } else if (cmd === 'empty') {
            ret.push(queue.empty());
        } else {
            ret.push(queue.front());
        }
    }
    console.log(ret.join("\n"));
}

Solution();