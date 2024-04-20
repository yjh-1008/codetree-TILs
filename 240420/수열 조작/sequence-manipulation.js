const fs = require('fs');
const N = parseInt(fs.readFileSync(0).toString().trim());
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.count = 0;
    this.head = null;
    this.tail = null;
  }

  pushFront(item) {
    const node = new Node(item);

    if(this.count === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.count += 1;
  }
  pushBack(item) {
    const node = new Node(item);

    if(this.count === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next= node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.count += 1;
  }

  popFront() {
    const node = this.head;

    if(this.count === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = node.next;
      this.head.prev = null;
    }
    this.count -=1;
    return node;
  }

  size() {
    return this.count;
  }
}


const Solution = () => {
 const arr = new Deque();
 for(let i=1;i<=N;i++) arr.pushBack(i);
//  console.log(arr)
 while(arr.size() > 1) {
    arr.popFront();
    const value = arr.popFront().value;
    // console.log(value);
    arr.pushBack(value);
 }
 console.log(arr.popFront().value)
}

Solution();