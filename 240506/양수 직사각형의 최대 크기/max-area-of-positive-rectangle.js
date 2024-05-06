const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n,m] = input[0].split(" ").map(Number);
const arr = [];
for(let i=1;i<=n;i++) {
    arr[i-1] = input[i].split(" ").map(Number);
}
// console.log(arr);
function isNNumber(i, j, q, w) {
    let cnt = 0;
    // console.log(i, j, q, w)
    for(let y=i;y<=q;y++) {
        for(let x=j;x<=w;x++) {
            if(arr[y][x] <= 0) return 0;
            cnt+=1;
        }
    }
    return cnt;
}
let ret = 0;
function Solution() {
    for(let i=0;i<n;i++) {
        for(let j=0;j<m;j++) {
            for(let q=i;q<n;q++) {
                for(let w=j;w<m;w++) {
                    ret = Math.max(ret, isNNumber(i, j, q, w));
                }
            }
        }
    }
    console.log(ret)
}

// [y][x]

Solution();