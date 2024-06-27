const fs = require('fs');
const [K,N] = fs.readFileSync(0).toString().trim().split(" ").map(Number);

function go(cnt, arr) {
    if(cnt === N) {

        console.log(arr.join(" "));
        return;
    }

    for(let i=1;i<=K;i++) {
        if(cnt < 2) {
            arr.push(i);
            go(cnt+1, arr);
            arr.pop();
        }else {
            if(i === arr[cnt-1] === arr[cnt-2]) continue;
            arr.push(i);
            go(cnt+1, arr);
            arr.pop();
        }
    }
}

function Solution() {
    go(0,[])
}

Solution();