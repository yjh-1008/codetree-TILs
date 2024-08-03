const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n,m] = input[0].split(" ").map(Number);
const INF = Infinity
const dist = Array.from({length:n}, () => new Array(n).fill(INF));
// console.log(dist);
for(let i=1;i<=m;i++) {
    const [r, c, w] = input[i].split(" ").map(Number);
    // console.log(r, c, w);
    dist[r-1][c-1] = Math.min(w, dist[r-1][c-1]);
}

for(let i=0;i<n;i++) {
    dist[i][i] = 0;
}


function Solution() {
    for(let k=0;k<n;k++) {
        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                if(dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] =  dist[i][k] + dist[k][j]
                }
            }
        }
    }   

    let ret = [];
    for(let i=0;i<n;i++) {
        ret = [];
        for(let j=0;j<n;j++) {
            if(dist[i][j] === INF) ret.push(-1);
            else ret.push(dist[i][j]);
        }
        console.log(ret.join(" ").trim())
    }
}

Solution()