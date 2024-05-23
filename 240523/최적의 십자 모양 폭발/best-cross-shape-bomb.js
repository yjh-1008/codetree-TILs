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

// function dfs(r, c, visited, newGrid2) {
//     visited[r][c] = true;
//     let cnt = 1;
//     for(let i=0;i<4;i++) {
//         const [ny, nx] = MOVES[i];
//         const my = ny+r , mx = nx+c;
//         if(!isRange(my, mx) || visited[my][mx]) continue;
//         if(newGrid2[r][c] === newGrid2[my][mx]) cnt += dfs(my, mx, visited, newGrid2);
//     }
//     return cnt;
// }
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
            //  if(r=== 2&& c===1)console.log(my, mx)
             if(!isRange(my, mx)) continue;
            newGrid[my][mx] = NONE;
        }
    }
    const newGrid2 = Array.from({length:N} ,() => new Array(N).fill(0));
    //중력이 작동해야함
    for(let i=0;i<N;i++) {
        let idx = N-1;
        for(let j=N-1;j>=0;j--) {
            if(newGrid[j][i] > NONE) {
                newGrid2[idx--][i] = newGrid[j][i];
            }
        }
    }
    //dfs를 진행해서 카운팅 해야함.
        //중력이 작동해야함
    let cntNum = 0;
    for(let i=0;i<N;i++) {
        let n =-1, idx2=0, cnt = 0;
        for(let j=0;j<N;j++) {
            if(newGrid2[i][j] === 0) continue;
            if(n === newGrid2[i][j]) {
                cnt += 1;
            } else {
                if(cnt >= 2) cntNum+= 1;
                else {
                    n = newGrid2[i][j];
                    idx2=j;
                    cnt = 1;
                }
            }
        }
        if(cnt >=2) cntNum+=1;
    }

    for(let i=0;i<N;i++) {
        let n =-1, idx2=0, cnt = 0;
        for(let j=0;j<N;j++) {
             if(newGrid2[j][i] === 0) continue;
            if(n === newGrid2[j][i]) {
                cnt += 1;
            } else {
                if(cnt >= 2) cntNum+= 1;
                else {
                    n = newGrid2[j][i];
                    idx2=j;
                    cnt = 1;
                }
            }
        }
        if(cnt >=2) cntNum+=1;
    }
    ret = Math.max(cntNum, ret);
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