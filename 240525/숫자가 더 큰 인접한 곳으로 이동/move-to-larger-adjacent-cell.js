const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let [n, r, c] = input[0].trim().split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));

const DX = [0,0,-1,1];
const DY = [1,-1,0,0];

function isRange (r, c) {
    if(r < 0 || r>=n || c< 0 || c>=n) return false;
    return true;
}

function Solution() {
    let ret = ``;

    // let chk = true;
    // let point
    r -= 1; c-=1;
    while(true) {
        let max = arr[r][c], nextY = -1,nextX = -1;
        ret += `${arr[r][c]} `
        for(let i=0;i<4;i++) {
            const my = DY[i]+ r, mx = DX[i]+c;
            if(!isRange(my, mx)) continue;
            if(max < arr[my][mx]) {
                max = arr[my][mx];
                nextY = my;
                nextX = mx;
                break;
            }
        }
        if(nextY === -1 && nextX === -1) break;
        r = nextY;
        c = nextX;
    }
    console.log(ret)
}

Solution();