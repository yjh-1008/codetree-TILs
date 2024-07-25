const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.split(" ").map(Number));
const visited = Array.from({length:N}, () => new Array(M).fill(false));
const dr = [-1,1,0,0], dc = [0,0,-1,1]


for(let i=0;i<N;i++) {
    for(let j=0;j<M;j++) {
        if(arr[i][j] === 0) visited[i][j] = true;
    }
}
 

function moveable(r, c) {
    if(r< 0 || r>N-1 || c<0 || c>M-1) return false;
    return true;
}

function Solution() {
    const q = [];
    q.push([0,0]);
    let chk  = false;
    while(q.length) {
        const [r, c] = q.shift();
        if(r === N-1 && c === M-1) {
            chk = true;
            break;
        }
        // console.log(r, c)
        for(let i=0;i<4;i++) {
            const nr = dr[i] + r, nc = dc[i]+c
            if(moveable(nr,nc) && visited[nr][nc] === false) {
                visited[nr][nc] = true;
                q.unshift([nr,nc]);
            }
        }
    }
    console.log(chk ? 1 : 0)
}
Solution();