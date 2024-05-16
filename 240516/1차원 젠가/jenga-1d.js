const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
let arr = []
for(let i=1;i<=N;i++) {
    arr[i-1] = Number(input[i]);
}
// arr = arr.reverse()
function Solution() {
    for(let i=N+1;i<input.length;i++) {
        const [s,e] = input[i].trim().split(" ").map((v) => v-1);
        let tmp = [];
        arr.forEach((item,idx) => {
            if(idx < s || idx > e) {
                tmp.push(item);
            }
        })
        arr = tmp;
    }

    let ret = ''
    ret += arr.length+'\n';
    arr.forEach((item) => ret += item+'\n');
    console.log(ret)
}

Solution();