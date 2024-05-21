const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].trim().split(" ").map(Number);
const arr = input.slice(1, N+1).map(item => item.trim().split(" ").map(Number));
const cols = input.slice(N+1, input.length).map((item) => item-1);
const NONE = 0;
const RANGE = [[0,-1],[0,1],[1,0],[-1,0]];
function isRange(y, x) {
    if(y < 0 || y>=N || x<0 || x>=N) return false;
    return true;
}


function bomb(y, x) {
    const area = arr[y][x]-1;
    arr[y][x] = NONE;
    for(let i=0;i<4;i++) {
        const [ny, nx] = RANGE[i];
        for(let j=1;j<=area;j++) {
            const my = (ny*j)+y, mx = (nx*j)+x;
            if(!isRange(my, mx)) break;
            arr[my][mx] = NONE;
        }
    }
    // console.log(arr)
}

function redraw() {
    const newArr = Array.from({length:N}, () => new Array(N).fill(0));
    for(let i=0;i<N;i++) {
        let newIdx = 3;
        for(let j=3;j>=0;j--) {
          if(arr[j][i] > 0) {
            newArr[newIdx--][i] = arr[j][i];
          }
        }
    }
    // console.log('new',newArr);
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            arr[i][j] = newArr[i][j]
        }
    }
}


function Solution() {
    for(let i=0;i<M;i++) {
        let col = cols[i], row;
        //배열의 선택된 열중에서 가장 위의 값을 찾는다.
        for(let i=0;i<N;i++) {
            if(arr[i][col] !== NONE) {
                row = i;
                break;
            }
        }
        if(row === undefined) continue;
        // console.log(arr[row][col],'row',row);
        //해당 값을 기준으로 폭탄을 터트린다.
        bomb(row, col);
        //터진 값들보다 위에 있는 값들을 아래로 내린다. 
        redraw();
        // console.log(arr)
    }
    let ret = '';
    arr.forEach((item) => ret+= `${item.join(" ")}\n`)
    console.log(ret)
}

Solution();