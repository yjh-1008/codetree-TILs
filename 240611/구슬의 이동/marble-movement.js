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
    let ny, nx;
    for(let i=1;i<=v;i++) {
        let dir = MOVE_OBJ[d];
        let by = ny, bx = nx;
        ny = my[dir]+y, nx = mx[dir]+x;
        if(!isRange(ny, nx)) {
            d = reverse(d);
            dir = MOVE_OBJ[d]
            // console.log(dir);
            ny = my[dir]+by, nx = mx[dir]+bx;
        }
    }
    // console.log(newGrid[ny][nx], ny, nx)
    const tmp = [...newGrid[ny][nx]];
    console.log(tmp)
    newGrid[ny][nx] = [...tmp,[d, v, idx]];
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
                newGrid[i][j] = arr[i][j];
            }
        }
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                if(arr[i][j].length) {
                    // console.log(arr[i][j].length)
                    move(i,j, newGrid);
                }
            }
        }
        console.log(newGrid)
        removeBalls(newGrid);

        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                arr[i][j] = newGrid[i][j];
            }
        }
        
        T--
    }
    console.log('here')
    console.log(arr)
}

Solution();