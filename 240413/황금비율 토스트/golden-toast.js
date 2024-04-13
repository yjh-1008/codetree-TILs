class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
  }
  
  class DoubleLinkedList {
    constructor() {
        this.END = new Node(-1);
        this.head = this.END;
        this.tail = this.END;
        this.size = 0;
      }
  
    pushFront(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
  
        this.head.prev = newNode;
        this.head = newNode;
        newNode.prev = null;
        this.size += 1;
    }
  
    pushBack(data) {
        const newNode = new Node(data);
        if(this.begin() === this.end()) {
            this.pushFront(data);
        }else {
            newNode.prev = this.tail.prev;
            this.tail.prev.next = newNode;
            newNode.next = this.tail;
            this.tail.prev = newNode;
  
            this.size += 1;
        }
    }
  
    erase(node) {
        const nextNode = node.next;
  
        if(node === this.begin()) {
            const temp = this.head;
            temp.next.prev = null;
            this.head = temp.next;
            temp.next=null;
        } else {
            node.prev.next = node.next;
            node.next.prev =node.prev;
            node.next = null;
            node.prev = null;
        }
  
        this.size -= 1;
        return nextNode;
    }
  
    insert(node, newData) {
        if(node === this.end()) {
            this.pushBack();
        }else if(node ===this.begin()) {
            this.pushFront();
        }else {
            const newNode = new Node(newData);
            newNode.prev = node.prev;
            newNode.next = node;
            node.prev.next = newNode;
            node.prev = newNode;
  
            this.size += 1;
        }
    }
  
    begin() {
        return this.head;
    }
  
    end() {
        return this.tail;
    }
  }
  
  const fs = require("fs");
  const input = fs.readFileSync(0).toString().trim().split("\n");
  
  // 변수 선언 및 입력:
  const [n, m] = input[0].split(" ").map(Number);
  const s = input[1];
  const commands = input.slice(2, 2 + m);
  
  // 연결리스트 정의
  const l = new DoubleLinkedList();
  s.split("").map(c => l.pushBack(c));
  
  // iterator 정의
  let it = l.end();
  
  commands.forEach(command => {
      if (command.startsWith("L")) {
          if (it !== l.begin()) { // 빵들의 맨 앞이 아니라면
              it = it.prev; // 앞으로 이동합니다.
          }
      } else if (command.startsWith("R")) {
          if (it !== l.end()) { // 빵들의 맨 뒤가 아니라면
              it = it.next; // 뒤로 이동합니다.
          }
      } else if (command.startsWith("D")) {
          if (it !== l.end()) { // 빵들의 맨 뒤가 아니라면
              it = l.erase(it); // 바로 뒤에 있는 빵을 제거합니다.
          }
      } else {
          const [_, c] = command.split(' ');
          l.insert(it, c); // 가리키는 위치에 문자 c를 추가합니다.
      }
  });
  
  // 출력:
  let ans = "";
  it = l.begin();
  while (it !== l.end()) {
      ans += it.data;
      it = it.next;
  }
  console.log(ans);