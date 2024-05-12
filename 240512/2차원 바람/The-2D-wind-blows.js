//1. 직사각형의 경계에 있는 숫자들이 회전한다.
//2, 직사각형 경계에 있는 숫자들이 평균값으로 변한다.
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M, Q] = input[0].split(" ").map(Number);
let arr = [];
for(let i=1;i<=N;i++) {
    arr[i-1] = input[i].trim().split(" ").map(Number);
}
const MOVES = [[-1,0],[0,1],[1,0],[0,-1]];
function topWind(sy, sx,ex, tmp){
    let rv = arr[sy][ex];
    let t1 = tmp;
    let t2;
    for(let i=sx;i<=ex;i++) {
      t2 = arr[sy][i];
      arr[sy][i] = t1;
      t1 = t2;
    }
    arr[sy][sx] = tmp;
    return rv;
}

function rightWind(ex,sx, sy, ey, tmp) {
    let rv = arr[ey][ex];
    // console.log(arr);
    let t1 = tmp, t2;
    for(let i=sy+1;i<=ey;i++) {
      t2 = arr[i][ex];
      arr[i][ex] = t1;
      t1 = t2;
    }
    return rv;
}

function bottomWind(ey,sx, ex, tmp) {
    let rv = arr[ey][sx];
    let t1 = tmp, t2;
    for(let i=ex-1;i>=sx;i--) {
      t2 = arr[ey][i];
      arr[ey][i] = t1;
      t1 = t2;
    }
    // arr[ey][ex] = tmp;
    return rv;
}

function leftWind(sx, sy, ey, tmp) {
  let t1 = tmp, t2;
    for(let i=ey-1;i>sy;i--) {
      t2 = arr[i][sx];
      arr[i][sx] = t1;
      t1 = t2;
    }
    // arr[sy][sx] = tmp;
}
function getAvg(y, x, tmpArr) {
  let cnt = 1, sum = tmpArr[y][x];

  for(let i=0;i<4;i++) {
    const [ny, nx] = MOVES[i];
    // console.log(x+nx, M-1);
    if(y+ny < 0 || y+ny >= N || x+nx<0 || x+nx >= M) continue;
    cnt += 1;
    sum += tmpArr[y+ny][x+nx];
    // console.log(tmpArr[1][2])
  }
  // if(y=== 1 && x===5) console.log(sum, cnt)
  return Math.floor(sum/cnt);
}

function Solution() {
    for(let q = N+1;q<input.length;q++) {
        const [sy, sx, ey, ex] = input[q].trim().split(" ").map(v => Number(v)-1);
        //회전 알고리즘.
        let tmp = arr[sy+1][sx];
        tmp = topWind(sy, sx, ex, tmp);
        tmp = rightWind(ex,sx, sy, ey, tmp);
      
        tmp = bottomWind(ey, sx, ex, tmp);
      
        leftWind(sx,sy, ey, tmp);
      
        const tmpArr = JSON.parse(JSON.stringify(arr));
        // console.log(tmpArr);
        for(let i=sy;i<=ey;i++) {
          for(let j=sx;j<=ex;j++) {
            arr[i][j] = getAvg(i, j, tmpArr)
          }
        }
    }
    let ret = '';
    arr.forEach((item) => ret+= `${item.join(" ")}\n`);
    console.log(ret.trim());
}

Solution();