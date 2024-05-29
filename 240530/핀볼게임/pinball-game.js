const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n")
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number))

const dx = [0,-1,0,1];
const dy = [1,0,-1,0];
let ret = 0;

function isRagne(r, c) {
    if(r<0|| r>=N||c<0 || c>=N) return false;
    return true;
}
// 3 -> 4 4-> 3
function go(r, c, idx) {
    let time= 0;
    const visited = Array.from({length:N}, () => new Array(N).fill(false));
    // console.log(arr[0][4])
    while(true) {

        r+=dy[idx], c+=dx[idx];
        time+=1;
   
        if(time >= 42000000) {
            return;
        }
        if(!isRagne(r, c)) {
            time+=1;
            ret = Math.max(time, ret);
            return;
        }

        // visited[r][c] = true;
        if(arr[r][c] === 1) {
            if(idx === 0) idx =1;
            else if(idx ===1) idx = 0;
            else if(idx ===2) idx =3;
            else idx =2;
        } else if(arr[r][c] === 2) {
            if(idx === 0) idx =3;
            else if(idx ===1) idx = 2;
            else if(idx ===2) idx =1;
            else idx =0;
        }



    }
    return;
}


function Solution() {
//4방면으로 진행해야한다.
    for(let i=0;i<N;i++) {
        
        go(0, i, 0);
    }

    for(let i=0;i<N;i++) {
        go(i, N-1, 1);
    }

    for(let i=0;i<N;i++) {
        go(N-1, i, 2)
    }

    for(let i=0;i<N;i++) {
        go(i, 0, 3);
    }
    // go(4, 0, 3)
    console.log(ret)
}

Solution();