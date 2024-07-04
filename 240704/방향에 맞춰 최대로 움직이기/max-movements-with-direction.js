const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const map = input.slice(1, 1+N).map((item) => item.split(" ").map(Number));
const move = input.slice(1+N, input.length-1).map((item) => item.split(" ").map(Number));
const [sy, sx] = input.at(-1).split(" ").map((item) => item-1);
const my = [null, -1, -1, 0, 1, 1, 1, 0, -1];
const mx = [null, 0, 1, 1, 1, 0, -1, -1, -1];

function isRange(y, x, dir) {
    let ny = y + my[dir], nx = x+mx[dir];
    if(ny < 0 || ny >= N || nx < 0 || nx>=N) return false;
    return true;
}
let ret = -1;
function go(sy, sx, cnt) {
    const dir = move[sy][sx];
    const val = map[sy][sx];
    let y = sy, x = sx;
    ret = Math.max(cnt);
    while(isRange(y, x, dir)) {
        y = y+my[dir], x=x+mx[dir];
        if(val < map[y][x]) {
            go(y, x, cnt+1);
        }
    }
}


function Solution() {
    go(sy, sx, 0);
    console.log(ret)
    //방향으로 이동하면서 현재 값보다 큰 부분이 존재한다면 이동.
    //범위를 벗어나지 않는 이상 계속 이동.
}

Solution();