const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n")
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChildIndex(i) {
    return 2 * i + 1;
  }

  rightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(i) {
    while (i > 0 && this.heap[i] > this.heap[this.parentIndex(i)]) {
      this.swap(i, this.parentIndex(i));
      i = this.parentIndex(i);
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if(this.heap.length ===1) return this.heap.pop()
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }

  heapifyDown(i) {
    while (this.leftChildIndex(i) < this.heap.length) {
      let largest = this.leftChildIndex(i);
      if (
        this.rightChildIndex(i) < this.heap.length &&
        this.heap[this.rightChildIndex(i)] > this.heap[largest]
      ) {
        largest = this.rightChildIndex(i);
      }
      if (this.heap[i] >= this.heap[largest]) break;
      this.swap(i, largest);
      i = largest;
    }
  }

  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }
}
const pq = new MaxHeap();
input.slice(1, input.length).map((item) => {
    // console.log(pq.heap)
    const [cmd, num] = item.split(" ");
    if(cmd === 'push') pq.insert(num);
    else if(cmd === 'size') {
        console.log(pq.size());
    } else if(cmd === 'pop') {
        // console.log('here');
        console.log(pq.pop());
    } else if(cmd === 'empty') {
        console.log(pq.heap.length ? 0 : 1);
    } else if(cmd === 'top') {
        console.log(pq.peek())
    } 
})