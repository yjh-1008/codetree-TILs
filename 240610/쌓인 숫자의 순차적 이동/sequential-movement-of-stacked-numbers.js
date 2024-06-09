const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const inputArr = input.slice(1, 1+N).map((item) => item.trim().split(" ").map(Number));
const arr = Array.from({length:N},() => new Array(N).fill([]));
// arr[0][0] = 0
for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
        arr[i][j] = [...arr[i][j],inputArr[i][j]];
    }
}
const nums = input.at(-1).trim().split(" ").map(Number);
const dy= [-1,-1,-1,0,1,1,1,0];
const dx= [-1,0,1,1,1,0,-1,-1]; 

function isRange(y, x) {
    if(y< 0 || y>=N || x< 0| x>=N) return false;
    return true;
}

function getMaxIdx(newGrid, y, x) {
    let rx=-1, ry=-1, value = -1;
    for(let i=0;i<8;i++) {
        const ny = dy[i]+ y, nx = x+dx[i];
        if(isRange(ny, nx)) {
            const before = [...newGrid[ny][nx]];
            const max = newGrid[ny][nx].sort((a,b) => b-a)[0];
             newGrid[ny][nx] = [...before]
            if(value < max) {
                value = max;
                ry=ny, rx=nx;
            }
        }
    }

    return [ry, rx, value];
}

function Solution() {
            // console.log(arr)
    nums.forEach((n) => {
        const newGrid = Array.from({length:N},() => new Array(N));
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                newGrid[i][j] = [...arr[i][j]];
            }
        }
        let chk = false;
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                if(arr[i][j].includes(n)) {
                    chk = true;
                    const[ry, rx, value] = getMaxIdx(newGrid, i, j);
                    if(value === -1) continue;
                    const idx = newGrid[i][j].findIndex(item => item === n);
                    // console.log('idx', idx)
                    newGrid[ry][rx] = [...newGrid[ry][rx], ...newGrid[i][j].slice(idx, newGrid[i][j].length)];
                    // newGrid[ry][rx] = [...newGrid[ry][rx], ...newGrid[i][j].slice(idx, newGrid[i][j].length)]; 
                    newGrid[i][j] = [...newGrid[i][j].slice(0, idx)];
                  
                }
            }
            if(chk) break;
        }
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                arr[i][j] = newGrid[i][j];
            }
        }

    })
    let ret = '';
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(arr[i][j].length === 0) ret+= 'None\n';
            else ret += arr[i][j].reverse().join(" ")+'\n';
        }
    }
    console.log(ret);
}
Solution();