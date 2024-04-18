class Stack {
  constructor() {              // 빈 스택 하나를 생성합니다.
      this.items = [];
  }
  
  push(item) {
      this.items.push(item);
  }

  pop() {
      return this.items.pop();
  }

  size() {
      return this.items.length;
  }

  empty() {
      return this.items.length === 0 ? 1 : 0;
  }

  top() {
    console.log(this.items)
      return this.items[this.items.length-1];
  }

  join(str) {
      return this.items.join(str);
  }
}

const fs = require('fs');
const arr = fs.readFileSync(0).toString().trim().split("");
const stack = [];
let ret = true;
arr.forEach((item) => {
    if(item === '(') {
        stack.push(item);
    } else {
        if(stack.length== 0) {
            ret = false;
            return;
        } else {
            stack.pop();
        }
    }
})

if(stack.length == 0) console.log(ret ? 'Yes' : 'No');
else console.log('No')