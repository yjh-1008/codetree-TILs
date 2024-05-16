const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const arr = [];
for(let i=1;i<=N;i++) {
    arr[i-1] = input[i].trim().split(" ").map(Number);
}
const MOVES = [[1,0],[0,1],[-1,0],[0,-1]];

function isArea(y, x) {
    if(y < 0 || y>=N || x<0 || x>=N) return false;
    return true;
}

function Solution() {
    const [y, x] = input[input.length-1].split(" ").map(v=> v-1);

    const area = arr[y][x];
    // console.log()
    arr[y][x] = 0;
    // console.log(area);
    MOVES.forEach((item) => {
        const [my, mx] = item;
        for(let i=1;i<=area-1;i++) {
            const ny = (my*i)+y, nx = (i*mx)+x;
            if(!isArea(ny, nx)) break;
            arr[ny][nx] = 0;
        }
    })
    // console.log(arr);
    for(let j=0;j<N;j++) {
        let tmp = [];
        for(let i=0;i<N;i++) {
            if(arr[i][j] > 0) tmp.push(arr[i][j]);
        }
        // console.log(tmp)
        for(let i=tmp.length;i<N;i++) {
            tmp.unshift(0);
        }
        // console.log(tmp)
        for(let i=0;i<N;i++) {
            arr[i][j] = tmp.shift();
        }
        // console.log(tmp)
    }

    arr.forEach((item) => {
        console.log(item.join(" "));
    })
} 

Solution()