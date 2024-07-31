const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const arr = [0,...input[1].split(" ").map(Number)];
const prefix = Array(N+1).fill(0);
function Solution() {
    prefix[1] = arr[1];
    for(let i=2;i<=N;i++) {
        prefix[i] = prefix[i-1] + arr[i]
    }
    let ret = Number.MIN_VALUE;
    // console.log(prefix);
    for(let i=M;i<=N;i++) {
        // console.log(prefix[i] - prefix[i-M]);
        ret = Math.max(prefix[i] - prefix[i-M], ret);
    }
    console.log(ret)
}
Solution();