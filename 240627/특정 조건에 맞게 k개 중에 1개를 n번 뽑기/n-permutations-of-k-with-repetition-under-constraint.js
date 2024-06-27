const fs = require('fs');
const [K,N] = fs.readFileSync(0).toString().trim().split(" ").map(Number);

function chk(arr, i, cnt) {
    // console.log(arr, i,cnt, arr[cnt-2] == i == arr[cnt-1])
    return arr[cnt-2] == i && i == arr[cnt-1] && arr[cnt-1] == arr[cnt-2];
}

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
            arr.push(i);
            if(!chk(arr, i, cnt)) go(cnt+1, arr);
            arr.pop();
        }
    }
}

function Solution() {
    go(0,[])
}

Solution();