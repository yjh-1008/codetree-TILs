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

function move(marble) {
    // 구슬이 벽에 부딪혔을 때의 처리를 간단히 하기 위해
    // dir 기준 0, 3이 대칭 1, 2가 대칭이 되도록 설정합니다.
    const dx = [-1, 0, 0, 1], dy = [0, 1, -1, 0];
    let [x, y, moveDir] = marble;
    
    // 바로 앞에 벽이 있는지를 판단합니다.
    const nx = x + dx[moveDir], ny = y + dy[moveDir];
    
    // Case 1 : 벽이 없는 경우에는 그대로 한 칸 전진합니다.
    if (isRange(nx, ny)) {
        return [nx, ny, moveDir];
    } 
    // Case 2 : 벽이 있는 경우에는 방향을 반대로 틀어줍니다.
    // 위에서 dx, dy를 move_dir 기준 0, 3이 대칭 1, 2가 대칭이 되도록
    // 설정해놨기 때문에 간단하게 처리가 가능합니다.
    else {
        return [x, y, 3 - moveDir];
    }
}


function moveAll() {
    marbles.forEach((marble, idx) => {
        marbles[idx] = move(marble);
    })
}
function duplicateMarbleExist(targetIdx) {
    const [targetX, targetY, _] = marbles[targetIdx];
    
    for (let i = 0; i < marbles.length; i++) {
        const [x, y, _] = marbles[i];
        if (i !== targetIdx && x === targetX && y === targetY) {
            return true;
        }
  }
  return false;
}



function removeDuplicateMarbles() {
    marbles = marbles.filter((_, i) => !duplicateMarbleExist(i));
}


function simulate() {
    moveAll();
    removeDuplicateMarbles();
}
let marbles = [];
function Solution() {
    let ret = '';
    while(T) {
       const tmp = input[fsIdx++].trim().split(" ").map(Number); 
       N = tmp[0], M = tmp[1];
       const arr = Array.from({length:N},()=> new Array(N).fill(-1));
        marbles = [];
        for(let i=0;i<M;i++) {
            const [y,x,d] = input[fsIdx++].trim().split(" ");
            arr[y-1][x-1] = MOVE_OBJ[d];
            marbles.push([y-1, x-1, MOVE_OBJ[d]])
            cnt+=1;
        }
        for (let i = 0; i < 2 * n; i++)
            simulate();
        ret += marbles.length + '\n';
        T--;
    }
    console.log(ret)
}

Solution();