const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, 1+N).map((item) => item.split(" ").map(Number));
const visited = Array.from({length:N}, () => Array(N).fill(false));
for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
        if(arr[i][j]) visited[i][j] = true;
    }
}
const dr = [-1,1,0,0];
const dc = [0,0,-1,1];
let ret = 0;

function moveable(nr, nc) {
    if(nr < 0 || nr>N-1 || nc<0 || nc > N-1) return false;
    return true;
}

function Solution() {
    input.slice(1+N, input.length).map((item) => {
        const [r, c] = item.split(" ").map((v) => v-1);
        if(visited[r][c] === false) {
            const q = [[r, c]];
            visited[r][c] = true;
            let cnt = 1;
            while(q.length) {
                const [cr, cc] = q.shift();

                for(let i=0;i<4;i++) {
                    const nr = dr[i] + cr, nc = dc[i] + cc;
                    if(moveable(nr, nc)) {
                        if(visited[nr][nc]=== true) continue;
                        visited[nr][nc] = true;
                        q.push([nr, nc]);
                        cnt+=1;
                    }
                }
            }
            ret += cnt;
        }

    })
    console.log(ret);
}

Solution();