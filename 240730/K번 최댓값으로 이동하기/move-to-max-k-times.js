const fs= require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr= input.slice(1, input.length-1).map(item => item.split(" ").map(Number));
// console.log(input)
const [sr, sc] = input[input.length-1].split(" ").map((v) => {return Number(v)-1});
let visited;
//현재 영역에서 가장 큰 값

//완성 배열
let answer = [sr, sc];
const dr = [-1,1,0,0];
const dc = [0,0,-1,1];

function moveable(r, c) {
    if(r< 0 || r>N-1 || c<0 || c>N-1) return false;
    return true;
}

function bfs(start) {
    // console.log(start)
    const q = [start];
    
    let ret= 0, initVal = arr[start[0]][start[1]];
    visited = Array.from({length:N}, () => new Array(N).fill(false));
    while(q.length) {
        const [cr, cc] = q.shift();
        visited[cr][cc] = true;

        for(let i=0;i<4;i++) {
            const nr = dr[i] + cr, nc = dc[i]+cc;
            if(moveable(nr, nc)) {
                //시작점보다 크거나 같다면 이동 x
                if(visited[nr][nc] === true || initVal <= arr[nr][nc]) continue;
                if(ret < arr[nr][nc]) {
                    ret = arr[nr][nc];
                    answer = [nr, nc];
                   
                } else if(ret === arr[nr][nc]) {
                    if(answer[0] > nr) {
                        answer = [nr, nc]
                    } else if(answer[0] === nr) {
                        if(answer[1] > nc) {
                            answer = [nr, nc]
                        }
                    }
                }
                 q.push([nr, nc]);
            }       
        }
    }
}

function Solution() {
    // console.log(sr, sc)
    answer =  [sr, sc];
    for(let t=0;t<K;t++) {
        bfs(answer);
        ret = 0;
        // console.log(answer[0]+1,answer[1]+1);
    }
    // console.log(arr[answer[0]][answer[1]])
    console.log(answer[0]+1,answer[1]+1);
}

Solution();