const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n,m] = input[0].split(" ").map(Number);
const arr = [];
for(let i=1;i<=n;i++) {
  arr[i-1] = input[i].split(" ").map(Number);
}

/**
 * 특정한 영역을 잡고
 * 그 영역 이외의 다른 영역을 잡았을때
 * 합이 최대가 되는 경우.
 * (직사각형을 판별하는 로직 필요.)
 */

function findRange(y1, x1,y2, x2, yy1, xx1, yy2, xx2) {
  if(yy1 >= y1 && yy1 <= y2 && xx1 >= x1 && xx1 <= x2) return false;
    if(y1 >= yy1  && y1 <= yy2 && x1 >= xx1 && x1 <= xx2) return false; 
    if(yy2 >= y1 && yy1 <= y2 && xx2 >= x1 && xx1 <= x2) return false;
    if(y2 >= yy1  && y2 <= yy2 && x2 >= xx1 && x2 <= xx2) return false; 
    return true;
}
let ret = -Infinity;
function another(i, j, q, w, sum1) {
  for(let y = 0;y<n;y++) {
    for(let x = 0;x<m;x++) {
      for(let sy = y;sy<n;sy++) {
        for(let sx=x;sx<m;sx++) {
            const chk = findRange(i, j, q, w, y, x, sy, sx);
            if(chk) {
              let sum = findSum(y, x, sy, sx);
              // if(sum + sum1 > 63) {
              //   console.log('squre1 : ',i, j, q, w, sum1)
              //   console.log('squre2 : ',y, x, sy, sx, sum)
              // }
              ret = Math.max(sum+sum1, ret);
            }
        }
      }
    }
  }
}
function findSum(y, x, sy, sx) {
  let sum = 0;
  for(let i=y;i<=sy;i++){
    for(let j=x; j<=sx;j++) {
      sum += arr[i][j];
    }
  }
  return sum;
}
function Solution() {
  for(let i=0;i<n;i++) {
    for(let j=0;j<m;j++) {
      let sum = 0;
      for(let q= i;q<n;q++) {
        for(let w = j;w<m;w++) {
            sum = findSum(i, j, q, w);
            another(i, j, q, w, sum);
        }
      }
    }
  }
  // console.log(findRange(3,3,3,3,0,0,3,4))
  console.log(ret);
}

Solution();