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
      }
  
    pushFront(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
  
        this.head.prev = newNode;
        this.head = newNode;
        newNode.prev = null;
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

        return nextNode;
    }
  
    insert(node, newData) {
        if(node === this.end()) {
            this.pushBack(newData);
        }else if(node ===this.begin()) {
            this.pushFront(newData);
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
  
  const fs = require('fs');
  const input= fs.readFileSync(0).toString().trim().split("\n");
  let [N, M] = input[0].split(" ").map(Number);
  const arr = input[1].split("");
  const Solution = () => {
      let idx = arr.length-1;
      const doubleList = new DoubleLinkedList();
      arr.forEach((item) => {
          doubleList.pushBack(item);
      })
      let lt = doubleList.end();
      for(let i=2;i<input.length;i++) {
          const [cmd, str] = input[i].split(" ");
          switch(cmd) {
              case 'L':
                  if(lt != doubleList.begin()) {
                    lt = lt.prev;
                  }
                  break;
              case 'P':
                  doubleList.insert(lt, str);
                  break;
              case 'R':
                if(lt != doubleList.end()) {
                    lt = lt.next;
                  }
                  break;
              case 'D':
                  if(lt != doubleList.end()) {
                    lt = doubleList.erase(lt);
                  }
                  break;
          }
      }
      let ans = "";
      lt = doubleList.begin();
      while (lt !== doubleList.end()) {
          ans += lt.data;
          lt = lt.next;
      }
      console.log(ans);
  }
  
  Solution();