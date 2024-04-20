class Deque {
    constructor() {
        this.dq = [];
    }

    pushFront(item) {
        this.dq.unshift(item);
    }

    pushBack(item) {
        this.dq.push(item);
    }

    popFront() {
        return this.dq.shift();
    }

    popBack() {
        // console.log
        return this.dq.pop();
    }

    empty() {
        return this.dq.length ? 0 : 1;
    }

    size() {
        return this.dq.length;
    }

    front() {
        return this.dq[0];
    }

    back() {
        return this.dq[this.dq.length-1];
    }
}

const fs = require('fs');
let input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
// input = input.slice(1)
const Solution = () => {
    const dq = new Deque();
    const ret = [];
    for(let i=1;i<=N;i++) {
        const [cmd, n] =input[i].split(" ");
        if(cmd === 'push_front') {
            dq.pushFront(n);
        } else if(cmd === 'push_back') {
            dq.pushBack(n);
        } else if(cmd === 'front') {
            // console.log(dq)
            ret.push(dq.front());   
        } else if(cmd === 'back') {
            ret.push(dq.back());
        } else if(cmd === 'empty') {
            ret.push(dq.empty());
        } else if(cmd === 'size') {
            ret.push(dq.size());
        } else if(cmd === 'pop_front') {
            ret.push(dq.popFront());
        } else if(cmd === 'pop_back'){
            
            ret.push(dq.popBack());
        }
    }
    console.log(ret.join("\n"))
}

Solution();