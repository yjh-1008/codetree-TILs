const fs = require('fs');
const [N, K] = fs.readFileSync(0).toString().trim().split(" ").map(Number);
// class Queue {
//     constructor(MAX) {
//         this.MAX = MAX;
//         this.q = [];
//         this.head = -1;
//         this.tail = -1;
//     }

//     push(item)
// }


const Solution = () => {
    const arr = new Array(N);
    for(let i=1;i<=N;i++) arr[i-1] = i;
    const ret = [];
    let cnt = 1;
    while(arr.length) {
        if(cnt != 0. && cnt%K === 0) {
            ret.push(arr.shift());
        }   else {
            arr.push(arr.shift());
        }
        cnt+= 1;
    }
    console.log(ret.join(" "))
}

Solution();