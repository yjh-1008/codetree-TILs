const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let fsIdx= 0;
let T = input[fsIdx++];
//N*2의 시간동안 한번도 안부딛치면 게임 종료. 또는 공이 하나만 있어도 게임 종료.
const MOVE_OBJ = {
    'U':0,
    'D':1,
    'L':2,
    'R':3
}
let N,M;
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];

function isRange(r, c) {
    if(r<0 || r>=N || c<0||c>=N) return false;
    return true;
}

function changeIdx(idx) {
    if(idx === 0) return 1;
    else if(idx===1) return 0;
    else if(idx ===2) return 3;
    else return 2;
}

function move(arr,cnt) {
    let time = 0;
    while(true) {
        if(cnt === 1 || time === N *2) break;
        time += 1;
        const nextGrid = Array.from({length:N},( )=> new Array(N).fill(-1));
        // console.log(arr)
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                //해당 위치에 공이 있다면
                if(arr[i][j] > -1) {
                    let idx = arr[i][j];
                    let ny = i+dy[idx], nx = j+dx[idx];
                    if(!isRange(ny, nx)) {
                        idx = changeIdx(idx);
                        if(nextGrid[i][j] > -1) {
                            cnt -=2;
                            nextGrid[i][j] = -1;
                        }else {
                            nextGrid[i][j] = idx;
                        }
                        continue;
                        // ny = i+dy[idx], nx = j+dx[idx];
                    }
                    //해당 위치에 공이 있다면?
                    if(nextGrid[ny][nx] > -1) {
                        nextGrid[ny][nx] = -1;
                        cnt -= 2;
                    } else { //없다면 공을 채운다.
                        nextGrid[ny][nx] = idx;
                    }
                }
            }
        }

        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                arr[i][j] = nextGrid[i][j];
            }
        }

    }
    return cnt;
}

function Solution() {
    let ret = '';
    while(T) {
       const tmp = input[fsIdx++].trim().split(" ").map(Number); 
       N = tmp[0], M = tmp[1];
       const arr = Array.from({length:N},( )=> new Array(N).fill(-1));
        let cnt = 0;
        for(let i=0;i<M;i++) {
            const [y,x,d] = input[fsIdx++].trim().split(" ");
            arr[y-1][x-1] = MOVE_OBJ[d];
            cnt+=1;
        }

        ret += move(arr,cnt) + '\n';
        T--;
    }
    console.log(ret)
}

Solution();