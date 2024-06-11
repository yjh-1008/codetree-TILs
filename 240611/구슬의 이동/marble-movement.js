const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let [N,M,T,K] = input[0].trim().split(" ").map(Number)
const arr = Array.from({length:N}, () => new Array(N).fill([]));
const cmds = input.slice(1, input.length).map(item => item.trim().split(" "));
const MOVE_OBJ = {
    'U' : 0,
    'D' : 1,
    'R' : 2,
    'L' : 3,
}
const my = [-1,1,0, 0];
const mx = [0,0,1,-1];
cmds.forEach((item, idx) => {

    const [y, x, d, v] = item;
    arr[y-1][x-1] = [d, v, idx+1];
})

function isRange(y, x) {
    if(y<0 || y>=N || x<0 || x>=N)return false;
    return true; 
}

function reverse(d) {
    if(d === 'U') return 'D';
    else if(d ==="D") return 'U';
    else if(d=='R') return 'L';
    else return 'R';
}

function move(y, x, newGrid) {
    let [d, v, idx] = arr[y][x];
    v = Number(v)
    let ny=y, nx=x
    for(let i=1;i<=v;i++) {
        let dir = MOVE_OBJ[d];
        let by = ny, bx = nx;
        ny = my[dir]+ny, nx = mx[dir]+nx;
        if(!isRange(ny, nx)) {
            d = reverse(d);
            dir = MOVE_OBJ[d]
            ny = my[dir]+by, nx = mx[dir]+bx;
        }
    }
    // const tmp = [...newGrid[ny][nx],[d, v, idx]]
    newGrid[ny][nx] = [...newGrid[ny][nx],[d, v, idx]];
}

function removeBalls(newGrid) {
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(newGrid[i][j].length > K) {
                let tmp = [...newGrid[i][j]];
                tmp.sort((a, b) =>  {
                    if(tmp[1] > tmp[b]) return 1;
                    else if(tmp[1] === tmp[b]) {
                        return tmp[2] - tmp[1];
                    }
                })
                newGrid[i][j] = tmp.slice(tmp.length-K, tmp.length);
            }
        }
    }
}

function Solution() {
    while(T){
        const newGrid = Array.from({length:N}, () => new Array(N).fill([]));
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                if(arr[i][j].length) {
                    move(i,j, newGrid);
                }
            }
        }
        removeBalls(newGrid);

        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                arr[i][j] = newGrid[i][j];
            }
        }
        
        T--
    }
    let ret = 0;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(arr[i][j].length) ret += arr[i][j].length
        }
    }
    console.log(ret)
}

Solution();