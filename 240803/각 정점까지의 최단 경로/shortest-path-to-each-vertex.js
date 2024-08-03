const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const start = +input[1]-1;
const graph =Array.from({length:N}, () => []);
input.slice(2, input.length).forEach((item) => {
    const [a, b, c] = item.split(" ").map(Number);
    graph[a-1].push([b-1, c]);
    graph[b-1].push([a-1, c])
})
let ret = []

class MinHeap{
    constructor() {
        this.heap = [null];
    }

    getCur() {
        return this.heap.length-1
    }

    getParent(idx) {
        return Math.floor(idx/2);
    }

    getLeft(idx) {
        return idx*2;
    }

    getRight(idx) {
        return idx*2+1;
    }

    swap(a,b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    push(idx, val) {
        this.heap.push([idx, val]);
        let cur = this.getCur(),parent = this.getParent();

        while(parent > 0 && this.heap[cur][1] < this.heap[parent][1]) {
            this.swap(cur, parent);
            cur = parent;
            parent = this.getParent(cur)
        }
    }


    pop() {
        if(this.heap.length === 2) return this.heap.pop();
        let val = this.heap[1];
        this.heap[1] = this.heap.pop();

        let cur = this.heap[1];
        let left = this.getLeft(cur), right = this.getParent(cur);
        // console.log(this.heap[left]);
        while(
            this.heap[left] && this.heap[left][1] < this.heap[cur][1] ||
            this.heap[right] && this.heap[right][1] < this.heap[cur][1]
        ) {
            let tmp = cur;
            if(left < this.heap.length && this.heap[cur][1] < this.heap[left][1]) {
                tmp = left;
            } else{
                tmp = right;
            }


            if(tmp === cur) break;

            swap(cur, tmp);
            cur = tmp;
            left = this.getLeft(cur), right= this.getRight(cur);
        }
        return val;
    }
}

function Solution() {
    const q = new MinHeap();
    const d = Array(N).fill(Infinity);
    d[start] = 0;
    q.push(start, 0);
    while(q.heap.length > 1) {
        const [cur, dist] = q.pop();
        if(d[cur] !==  dist) continue;
        graph[cur].forEach((value) => {
            const [v, weight] = value;
            // if(dist < weight) continue;
            if(d[v] > weight + dist) {
                d[v] = weight+dist;
                q.push(v, weight+dist);
            }
        })
    }


    d.forEach((item) => {
        const val = item === Infinity ? -1 : item;
        ret.push(val);
    })

    console.log(ret.join("\n").trim())
}

Solution();