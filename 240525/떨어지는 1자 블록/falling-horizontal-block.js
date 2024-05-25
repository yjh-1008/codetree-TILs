const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let [n,m,k] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));

function Solution() {
    k-=1;
    let idx = -1;
    for(let i=0;i<n;i++) {
        let chk = true;
        for(let j=k;j<k+m;j++) {
            //모두 비어져 있어야 함.
            if(arr[i][j] === 1) {
                chk = false;
                break;
            }
        }
        if(chk) idx = i;
        else break;
    }
    // console.log(idx);
    if(idx > -1) {
        for(let j=k;j<k+m;j++) {
        //모두 비어져 있어야 함.
            arr[idx][j] = 1;
        }

    }

    let ret = '';
    // console.log(arr)
    arr.map((item) => console.log(item.join(" ")))
}

Solution();