const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));
const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];


function isRange(r, c) {
    if(r<0 || r>=N || c<0 || c>=N) return false;
    return true;
}
const NONE = 0;

function meetTheCondition(x, y, nx, ny, newGrid2) {
    return isRange(x, y) && isRange(nx, ny) && newGrid2[x][y] && newGrid2[x][y] === newGrid2[nx][ny];
}

function calc(newGrid2) {
    let cnt = 0;
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            const dxs = [-1, 1, 0, 0], dys = [0, 0, 1, -1];
            
            dxs.forEach((dx, index) => {
                const dy = dys[index];
                const nx = x + dx, ny = y + dy;
                if (meetTheCondition(x, y, nx, ny, newGrid2)) {
                    cnt += 1;
                }
            });
        }
    }
    
    // 중복되어 2번씩 count되므로 2로 나누어줍니다.
    return cnt / 2;
}

let ret = -1;
function bomb(r, c) {
    const range = arr[r][c] -1;
    const newGrid =  Array.from({length:N} ,() => new Array(N).fill(0));
   
    for(let i=0;i<N;i++)  {
        for(let j=0;j<N;j++) {
            newGrid[i][j] = arr[i][j];
        }
    }
     newGrid[r][c] = NONE;
    for(let i=0;i<4;i++) {
        const [ny, nx] = MOVES[i];
        for(let j=0;j<range;j++) {
            const my = ny+r , mx = nx+c;
             if(!isRange(my, mx)) continue;
            newGrid[my][mx] = NONE;
        }
    }
    const newGrid2 = Array.from({length:N} ,() => new Array(N).fill(0));
    //중력이 작동해야함
    for(let i=0;i<N;i++) {
        let idx = N-1;
        for(let j=N-1;j>=0;j--) {
            if(newGrid[j][i]) {
                newGrid2[idx--][i] = newGrid[j][i];
            }
        }
    }
    ret = Math.max(calc(newGrid2), ret);
}

function Solution() {
    //완전 탐색으로 진행한다.
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            bomb(i, j);
        }
    }
    console.log(ret);
}

Solution();