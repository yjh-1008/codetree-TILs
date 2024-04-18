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
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1);
const Solution = () => {
  const s = new Stack();
  const ret = new Stack();
  // console.log(input)
  for(let i=0;i<N;i++) {
      const [cmd, num] = arr[i].split(" ");

      if(cmd === 'push') {
          s.push(num);
      } else if(cmd === 'pop') {
          ret.push(s.pop());
      } else if(cmd === 'size') {
          ret.push(s.size());
      } else if(cmd === 'top'){
          ret.push(s.top());
      } else {
        ret.push(s.empty())
      }
  }

  console.log(ret.join("\n"));
}

Solution();