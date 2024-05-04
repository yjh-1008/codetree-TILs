const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = Array.from({length:N}, ()=> new Array(M));

for(let i=1;i<1+N;i++) {
    arr[i-1] = input[i].split(" ").map(Number);
}

const MOVE = [[1,0],[-1,0], [1,0],[-1,0]];
let ret = 0;
function chkArea(y, x) {
    let cnt = 0;
    while(true)  {
     for(let i=0;i<4;i++) {
        const [ny, nx] =MOVE[i];
        let my, mx;
        if(ny < 0) {
           my = ny - cnt + y;
        } else {
          my= ny+cnt+y;
        }

        if(nx < 0) {
            mx = nx - cnt + x;
        } else {
            mx = nx+cnt+y;
        }
        
        // console.log(my, mx)
        if(my < 0 || mx<0 || my>=N || mx>=M) return cnt;
      }
      cnt+=1;
    }
}

function findCoin(y, x, cnt) {

    let coin = 0;
    for(let i= y-cnt+1;i<y+cnt-1;i++) {
        for(let j=x-cnt+1; j< x+cnt-1;j++) {
            if(arr[i][j]) coin += 1;
        }
    }
    if(arr[y][x-cnt]) coin +=1;
    if(arr[y][x+cnt]) coin += 1;
    if(arr[y-cnt][x]) coin += 1;
    if(arr[y+cnt][x]) coin +=1;
    return coin;
}

function Solution() {
    for(let i=0;i<N;i++) {
        for(let j=0;j<N;j++) {
            let cnt = chkArea(i,j);
            // console.log(cnt);
            if(cnt >= 1) {
                const coin = findCoin(i, j, cnt);
                const areaCost = cnt * cnt + (cnt+1) * (cnt+1);
                if(areaCost - coin*M) {
                    ret = Math.max(coin, ret);
                }
              
            }
        }
    }
    console.log(ret)
}

Solution();