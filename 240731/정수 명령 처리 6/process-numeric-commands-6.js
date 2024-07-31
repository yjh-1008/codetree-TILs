const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n")
// class MinHeap {
//     constructor() {
//         this.heap = [null];
//     }

//     heap_push(value) {
//         this.heap.push(value);
//         let currentIndex = this.heap-1;
//         let parentIndex = Math.floor(currentIndex/2);

//         while(parentIndex !== 0 && value< this.heap[parentIndex]) {
//             let tmp = this.heap[parentIndex];
//             this.heap[parentIndex] = this.heap[currentIndex];
//             this.heap[currentIndex] = tmp;

//             currentIndex = parentIndex
//             parentIndex = Math.floor(currentIndex/2);
//         }
//     }

//     heap_pop() {
//         if(this.heap.length === 2) return this.heap.pop();
//         let ret = this.heap.pop();
//         this.heap[1] = this.heap.pop();

//         let currentIndex = 1;
//         let left = 2, right = 3;
//         while(this.heap[currentIndex] > this.heap[left] || this.heap[currentIndex] > this.heap[right]) {
//             let index = this.heap[left] > this.heap[right] ? right: left;

//             const tmp = this.heap[currentIndex];
//             this.heap[currentIndex] = this.heap[index];
//             this.heap[index] = tmp;

//             currentIndex = index;
//             left = currentIndex *2;
//             right = currentIndex * 2 +1;
//         }


//         return ret;
//     }
// }

class MaxHeap {
    constructor() {
        this.heap = [null];
    }

    heap_push(val) {
        this.heap.push(val);

        let curIdx = this.heap.length-1;
        let parentIdx = Math.floor(curIdx/2);

        while(parentIdx !== 0 && this.heap[curIdx] < this.heap[parentIdx]) {
            const tmp = this.heap[curIdx];
            this.heap[curIdx] = this.heap[parentIdx];
            this.heap[parentIdx] = tmp;

            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx/2);
        }
    }

    heap_pop() {
        if(this.heap.length === 2) return this.heap.pop();
        const ret = this.heap.pop();
        let currentIndex = 1;
        let left = 2, right = 3;
          while(this.heap[currentIndex] < this.heap[left] || this.heap[currentIndex] < this.heap[right]) {
             let index = this.heap[left] < this.heap[right] ? right: left
             const tmp = this.heap[currentIndex];
             this.heap[currentIndex] = this.heap[index];
             this.heap[index] = tmp
             currentIndex = index;
             left = currentIndex *2;
             right = currentIndex * 2 +1;
         }

        return ret;
    }
}

class PriorityQueue extends MaxHeap {
    constructor() {
        super();
    }

    push(val) {
        this.heap_push(val);
    }

    pop() {
        return this.heap_pop();
    }

    size() {
        return this.heap.length-1;
    }

    empty() {
        return this.heap.length === 1 ? 1 :0
    }

    top() {
        return this.heap[1];
    }
}
const pq = new PriorityQueue();
input.slice(1, input.length).map((item) => {
    // console.log(pq.heap)
    const [cmd, num] = item.split(" ");
    if(cmd === 'push') pq.push(num);
    else if(cmd === 'size') {
        console.log(pq.size());
    } else if(cmd === 'pop') {
        // console.log('here');
        console.log(pq.pop());
    } else if(cmd === 'empty') {
        console.log(pq.empty());
    } else if(cmd === 'top') {
        console.log(pq.top())
    } 
})