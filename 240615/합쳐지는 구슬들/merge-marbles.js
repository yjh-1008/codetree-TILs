//방향을 바꾸는데도 1초가 소요.
//충돌하면 번호는 큰걸로 변경, 무게는 합쳐짐.
//큐를 써서 구슬을 넣어놓는다. 
//큐를 빼면서 진행.
const fs = require('fs');
const input = fs.readFileSync(0).toString().split("\n");
let [N,M,T] = input[0].trim().split(" ").map(Number);
let arr = Array.from({length:N},() => Array.from({length:N},() => []));
input.slice(1, input.lnegth).map((item, idx) => {
    const [r, c, d, w] = item.trim().split(" ");
    // console.log(r, c)
    arr[r-1][c-1].push([d, Number(w), idx+1]);
})

const MOVE_OBJ = {
    'U':0,
    'D':1, 
    'R':2, 
    'L':3
}

function isRange(y, x) {
    if(y < 0 || y>=N || x<0 || x>=N) return false;
    return true;
}

function reverse(d) {
    if(d === 'U') return 'D';
    else if(d === 'D') return 'U';
    else if(d=== 'R') return 'L';
    else return 'R';
}


function move(r, c, grid) {
    const my = [-1,1,0,0];
    const mx = [0,0,1,-1];
    let [d, w, idx] = arr[r][c][0];
    // console.log(arr[r][c])
    //현재 공의 위치 + 움직일 거리 >= N보다 크다면 범위를 벗어남.
    //이동해야 할 총 거리는 현재나의 좌표 + Math.abs(N-움직일거리); 1은 멈춰있는 시간. 
    let dir = MOVE_OBJ[d];
    //w만큼 이동할거임
    let tmpY = r, tmpX = c, ny=r, nx = c;
    ny = my[dir]+tmpY, nx = mx[dir]+tmpX;
        if(!isRange(ny, nx)) {
            d = reverse(d);
            // console.log(d)
            dir = MOVE_OBJ[d];
            ny = tmpY, nx = tmpX;
    }
    // console.log(ny, nx)
    grid[ny][nx].push([d, w, idx]);
    // console.log(d, w, idx)
}

function conver(tmp) {
    let nw=0, nIdx=0, nd=''
    tmp.forEach((item) => {
        // console.log(item);
        nw += item[1];
        if(nIdx < item[2]) {
            nIdx = item[2];
            nd = item[0];
        }
    })
    //  console.log(nw)
    return [nd, nw, nIdx];
} 

function add(nextGrid) {
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            //arr[i][j]가 빈 배열이 아니라면 공을 움직인다.
            // console.log(nextGrid[i][j])
            if(nextGrid[i][j].length > 1) {
                const ret = conver(nextGrid[i][j]);
                nextGrid[i][j] = [];
                nextGrid[i][j].push(ret);
            }
        }
    }
}

function Solution() {
    let ret = ``
    while(T) {
        const nextGrid =  Array.from({length:N},() => Array.from({length:N},() => []));
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                //arr[i][j]가 빈 배열이 아니라면 공을 움직인다.
                if(arr[i][j].length) {
                    move(i, j, nextGrid);
                }
            }
        }
        add(nextGrid);
        arr = nextGrid;
        T--
    }
    let cnt = 0, max= -1;
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            if(arr[i][j].length) {
                // console.log(arr[i][j])
                cnt +=1 ;
                max = Math.max(max, arr[i][j][0][1]);
            }
        }
    }
    console.log(cnt + ' '+max)
}

Solution();