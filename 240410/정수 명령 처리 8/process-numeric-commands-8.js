const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    } 
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.nodeNum = 0;
    }

    pushFront(data) {
        const node = new Node(data);
        node.next = this.head;

        if(this.head != null) {
            this.head.prev = node;
            this.head = node;
        } else {
            this.head = node;
            this.tail = node;
        }

        node.prev = null;
        this.nodeNum += 1;
    }

    pushBack(data) {
        const node = new Node(data);
        node.prev = this.tail;

        if(this.tail != null) {
            this.tail.next = node;
            this.tail = node;
        }else {
            this.head = node;
            this.tail = node;
        }

        node.next = null;
        this.nodeNum += 1;
    }

    popFront() {
        if(this.head == null) {
            console.log("List is Empty");
        } else if(this.head.next == null) {
            const temp = this.head;
            this.head = null;
            this.tail = null;
            this.nodeNum = 0;
            return temp.data;
        } else {
            const temp = this.head;
            temp.next.prev = null;
            this.head = this.head.next;
            temp.next = null;
            this.nodeNum -= 1;
            return temp.data;
        }
    }

    popBack() {
        if(this.tail == null) {
              console.log("List is Empty");
        } else if(this.tail.prev == null) {
            const temp = this.tail;

            this.head = null; // head값을 None으로 바꿔주고
            this.tail = null; // tail값도 None으로 바꿔주고
            this.nodeNum = 0; // 원소의 수도 0개로 변경해줍니다.

            return temp.data;
        } else {
            const temp = this.tail;
            temp.prev.next = null; // 새로 tail이 될 노드의 next값을 지워줍니다.
            this.tail = temp.prev; // tail값을 새로 갱신해주고
            temp.prev = null; // 이전 tail의 prev 값을 지워줍니다.

            this.nodeNum -= 1;
            return temp.data;
        }
    }

    size() {
        return this.nodeNum
    }

    empty() {
        return this.nodeNum === 0 ? 1 : 0;
    }

    front() {
        if(this.head === null) {
            console.log("List is Empty");
        } else {
            return this.head.data;
        }
    }

    back() {
        if(this.tail === null) {
            console.log("List is Empty");
        } else {
            return this.tail.data;
        }  
    }
}


function Solution() {
    const LinkedList = new DoubleLinkedList();
    const ret = [];
    for(let i=1;i<=N;i++) {
        // console.
        const [cmd, num] = input[i].split(" ");
        if(cmd === 'push_back') {
            LinkedList.pushBack(num);
        } else if(cmd === 'push_front') {
            LinkedList.pushFront(num);
        } else if(cmd === 'pop_front') {
            ret.push(LinkedList.popFront());
        } else if(cmd === 'pop_back') {
            ret.push(LinkedList.popBack());
        } else if(cmd === 'empty') {
            ret.push(LinkedList.empty())
        } else if(cmd === 'size') {
            ret.push(LinkedList.size())
        } else if(cmd === 'front') {
            ret.push(LinkedList.front());
        } else  {
            ret.push(LinkedList.back());
        }
    }

    console.log(ret.join("\n"))
}

Solution();