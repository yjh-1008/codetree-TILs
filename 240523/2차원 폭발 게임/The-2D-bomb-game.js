const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let [N, M, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, 1+N).map(item => item.trim().split(" ").map(Number));
const NONE = 0;
const MOVES = [[1,0],[-1,0],[0,1],[0,-1]];

function bomb(visited) {
   for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
        if(visited[i][j]) arr[i][j] = NONE;
    }
   }
}

function isRange(r, c) {
    if(r<0 || r>=N || c<0 || c>=N) return false;
    return true;
}

// function dfs(r, c, n, visited) {
//     let cnt = 1;
//     for(let i=0;i<MOVES.length;i++) {
//         const [ny, nx] = MOVES[i];
//         const my = ny+r, mx = nx+c;
//         if(!isRange(my, mx) || visited[my][mx]) continue;
//         if(arr[my][mx] === n) {
//             visited[my][mx] = true;
//             cnt += dfs(my, mx, n, visited);
//         } 
//     }
//     return cnt;
// }

function moveDown() {
  const newGrid = Array.from({length:N}, () => new Array(N).fill(0));
   for(let i=0;i<N;i++) {
    let idx = N-1;
    for(let j=N-1;j>=0;j--) {
        if(arr[j][i] !== NONE) {
            newGrid[idx--][i] = arr[j][i];
        }
    }
   }

    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            arr[i][j] = newGrid[i][j]
        }
    }
}

function rotate() {
    const newGrid = Array.from({length:N}, () => new Array(N).fill(0));
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            newGrid[i][j] = arr[N-j-1][i]
        }
    }

    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            arr[i][j] = newGrid[i][j]
        }
    }
}

function Solution() {
    while(K>=0) {
        
     while(true){
        let chk = false;
        for(let i=0;i<N;i++) {
           let idx = 0, cnt = 0, val=0;
           for(let j=0;j<N;j++) {
               //arr[i][j]가 0이 아니라면 폭탄을 터트린다.
               if(arr[j][i]) {
                   if(val === arr[j][i]) {
                       cnt+= 1;
                   } else {
                       if(cnt >= M) {
                            chk = true;
                           for(let k=idx;k<j;k++) {
                               arr[k][i] = 0;
                           }
                       }
                       cnt = 1;
                       val = arr[j][i];
                       idx = j;
                   }
               }
           }
           if(cnt >= M) {
                chk = true;
               for(let k=idx;k<N;k++) {
                   arr[k][i] = 0;
               }
           }
        }
        if(!chk) break;
     }

    moveDown();

    rotate();
     //회전시킨다.
    moveDown();
      K--;
    // console.log(arr);
    }
    let cnt = 0;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(arr[i][j]) cnt++
        }
    }
    console.log(cnt)
}

Solution();