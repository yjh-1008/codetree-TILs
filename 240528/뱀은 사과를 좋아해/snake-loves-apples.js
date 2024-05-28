const fs = require('fs');
const input= fs.readFileSync(0).toString().trim().split("\n");
const [N,M,K] = input[0].split(" ").map(Number);
const arr = Array.from({length:N}, () => new Array(N).fill(0));

function isRange(r, c) {
    if(r < 0 || r>=N || c< 0 || c>=N) return false;
    return true;
}

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];

function Solution() {
    for(let i=1;i<1+M;i++) {
        const [r,c] = input[i].split(" ").map((v) => v-1);
        arr[r][c] = 1;
    }

    const cmds = input.slice(1+M, input.length).map((item) => item.split(" "));
    let snake = [[0,0]];
    let ret = 0;
    for(let t = 0;t<cmds.length;t++) {
        const [dir, count] = cmds[t]
        const idx = MOVE_OBJ[dir];
        const my = dy[idx], mx = dx[idx];
        for(let i=0;i<count;i++) {
            ret += 1;
            const head = snake[0];
            const ny = my+head[0], nx = mx+head[1];

            const index = snake.findIndex((item)=> item[0] === ny && item[1]===nx);
            if(!isRange(ny, nx) ||  (index > -1 && index<snake.length-1)) {
                // console.log(t)
                return ret;
            }
            //사과가 있다면 길이를 1늘림
            if(arr[ny][nx] === 1) {
                snake = [[ny,nx], ...snake];
                arr[ny][nx] = 0;
            } else {
                // if(snake.length === 1) {
                //     snake = [[ny, nx]]
                // }
                snake.pop();
                snake = [[ny,nx], ...snake];
            }
        }
    }
    // console.log('here')
    return ret;
}

const MOVE_OBJ = {
    'U': 0,
    'D' : 1,
    'L' : 2,
    'R' : 3,
}

console.log(Solution());