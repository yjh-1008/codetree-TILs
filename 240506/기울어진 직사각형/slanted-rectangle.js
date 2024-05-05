const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
const arr = [];
for(let i=1;i<N+1;i++) {
  arr[i-1] = input[i].split(" ").map(Number); 
}

const chkArea = [[-1,1],[-2,0],[-1,-1]];

function isGo(y, x) {
  for(let i=0;i<3;i++) {
    const [ny, nx] = chkArea[i];
    const my = y+ny, mx = x+nx;
    if(my < 0 || my >= N || mx < 0 || mx >= N) return false;
  }
  return true;
}

function getSum(y, x) {
  let sum = arr[y][x];
  chkArea.forEach(([ny, nx]) => {
    sum +=arr[y+ny][x+nx]
  })
  let move = [y-1, x+1];
  while(true) {
    let tmpSum = 0;
    let chk = true;
    for(let i=0;i<2;i++) {
      const moveY = move[0] + chkArea[i][0];
      const moveX = move[1] + chkArea[i][1];
      if(moveY < 0 || moveY >= N || moveX < 0 || moveX >=N){
        chk = false;
      }
      else tmpSum += arr[moveY][moveX]
    }
    if(chk) {
       sum += tmpSum;
       move[0] = move[0]-1;
       move[1] = move[1]+1;
    }else {
      break;
    }
  }
  return sum;
}
let ret = 0;
function Solution() {
  for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
      const chk = isGo(i, j);      
      if(chk) {
        const sum = getSum(i,j);
        ret = Math.max(sum, ret);
      }
    }
  }
  console.log(ret);
}

Solution();