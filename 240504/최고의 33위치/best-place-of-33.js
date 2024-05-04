const fs = require('fs');
const input= fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);

const arr = Array.from({length:N}, () => new Array(N));

for(let i=1;i<1+N;i++) {
    arr[i-1] = input[i].split(" ").map(Number)
}

let ret = 0;
function cal(sR, sC, row, col) {
    let tmp = 0;
    for(let y=sR;y<=row; y++) {
        for(let x=sC; x<=col;x++) {
            if(arr[y][x]) tmp+=1;
        }
    }

    ret = Math.max(tmp, ret);
}
for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
        if(i+2 < N  && j+2< N) {
            cal(i, j, i+2, j+2);
        }
     }
}

console.log(ret);