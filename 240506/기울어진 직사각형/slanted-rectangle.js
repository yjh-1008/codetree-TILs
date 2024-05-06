const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
const arr = [];
for(let i=1;i<N+1;i++) {
  arr[i-1] = input[i].split(" ").map(Number); 
}

const moves = [[-1,1],[-1,-1],[1,-1],[1,1]];

function chkRange(y,x) {
  if(y < 0 || y >= N || x < 0 || x >= N) return false;
  return true;
}

function getScore(i, j, k, l) {
  const moveNum = [k, l, k, l];
  let selectSum = 0;
  for(let q=0;q<4;q++) {
    for(let w = 0;w<moveNum[q];w++) {
      const [ny, nx] = moves[q];
      i += ny;
      j += nx;

      if(!chkRange(i, j)) return 0;

      selectSum += arr[i][j];
    }
  }

  return selectSum;
}

let ret = 0;
function Solution() {
  for(let i=0;i<N;i++) {
    for(let j=0;j<N;j++) {
      for(let k=1;k<N;k++) {
        for(let l = 1;l<N;l++) {
          ret = Math.max(ret, getScore(i, j, k, l));
        }
      }
    }
  }
  console.log(ret);
}

Solution();