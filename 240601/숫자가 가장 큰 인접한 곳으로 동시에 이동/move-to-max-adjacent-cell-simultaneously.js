const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n, m, t] =input[0].trim().split(" ").map(Number);
const arr = input.slice(1, 1+n).map((item) => item.trim().split(" ").map(Number));
const marbles = Array.from({length:n}, () => new Array(n).fill(0));
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
input.slice(1+n, input.length).map((item) => {
    let [y, x] = item.trim().split(" ").map((v) => v-1);
    // console.log(y, x)
    marbles[y][x] = 1;
})

function isRange(r, c) {
    if(r<0||r>=n|| c<0|| c>=n) return false;
    return true;
}
 
function getMaxArea(r, c) {
    let value=arr[r][c], nr=r, nc=c;
    for(let i=0;i<4;i++) {
        const ny = dy[i]+r, nx = dx[i]+c;
        if(!isRange(ny, nx)) continue;
        if(value < arr[ny][nx]) {
            value = arr[ny][nx];
            nr = ny, nc = nx
        }
    }
    return [nr, nc];
}

function Solution() {
    // console.log(arr);
    for(let q=0;q<t;q++) {
        const nextGrid = Array.from({length:n}, () => new Array(n).fill(0))
      
        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                if(marbles[i][j]) {
                    const [nr, nc] = getMaxArea(i, j);
                    if(nextGrid[nr][nc] === 0) nextGrid[nr][nc] = 1;
                    // else if(nextGrid[nr][nc] ===1) nextGrid[nr][nc] = 0;
                }
            }
        }

        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                marbles[i][j] =nextGrid[i][j];
            }
        }
        // console.log(marbles);
    }
    let ret = 0;
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(marbles[i][j]) ret+=1;
        }
    }
    console.log(ret);
}
Solution();

//상하좌우 순서대로 우선순위를 매겨 가능한 곳 중 우선순위가 더 높은곳으로 이동