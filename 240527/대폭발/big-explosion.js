const fs = require('fs');
const input = fs.readFileSync(0).toString();
let [n, m, r, c] = input.trim().split(" ").map(Number);
const arr = Array.from({length:n},() => new Array(n).fill(0));

const dx = [0,0,-1,1];
const dy = [1,-1,0,0];

function isRagne(r, c) {
    if(r < 0 || r>=n || c< 0 || c>=n) return false;
    return true;
}

function dfs(r, c,visited, t) {
    // console.log(r, c);
    for(let i=0;i<4;i++) {
        const my = dy[i]*t + r, mx = dx[i]*t+c;
        if(!isRagne(my,mx) || arr[my][mx] === 1) continue;
        visited[my][mx] = true;
        arr[my][mx] = 1;
    }
}


function Solution() {
    r-=1, c-=1;
    // console.log(r, c)
    arr[r][c] = 1;

    for(let t=1;t<=m;t++) {
        const visited = Array.from({length:n},() => new Array(n).fill(false));
        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                if(arr[i][j] === 0 || visited[i][j] ) continue;
                visited[i][j] = true;
                dfs(i, j,visited, t);
            }
        }
    }
    let ret = 0;
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(arr[i][j] === 1) ret+=1;
        }
    }
    console.log(ret)
}

Solution();