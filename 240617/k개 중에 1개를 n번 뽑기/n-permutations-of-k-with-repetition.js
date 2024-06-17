const fs = require('fs');
let [K, N] = fs.readFileSync(0).toString().trim().split(" ").map(Number)
let ret = ``
function go(n, arr) {
    if(n === N) {
        ret += arr.join(" ")+'\n';
        return;
    }

    for(let i=1;i<=K;i++) {
        arr.push(i)
        go(n+1, arr);
        arr.pop();
    }
    return;
}

function Solution() {
    go(0,[]);
    console.log(ret)
}
Solution();