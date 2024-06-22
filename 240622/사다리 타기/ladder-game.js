const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
//a번째 열과 a+1번째열을 b행에 연결.
const lines = input.slice(1, input.length).map((item) => item.trim().split(" ").map((v) => Number(v)-1));
let ret = Number.MAX_VALUE;
const draw = (arr, tmp) => {
    tmp.forEach((item) => {
        const [a, b] = item;
        // console.log(a, b)
        arr[b][a][a+1] = true;
        arr[b][a+1][a] = true;
    })
    return;
}

function chkMap(arr, n) {
    let tmp =n;
    for(let i=0  ;i<M;i++) {
        //행을 통과하며 +1, -1 사이에 선이 있다면 그 방향으로 나아감.
        if(tmp + 1 < N && arr[i][tmp][tmp+1] === true) {
            tmp = tmp+1;
        } else if(tmp -1 >= 0 && arr[i][tmp][tmp-1] === true) {
            tmp -= 1;
        }
    }
    return tmp;
}

function go(tmp, cnt, firstRet) {
    if(cnt === M) {
      const arr = Array.from({length:M}, () => Array.from({length:N}, () => Array(N)));
      draw(arr,tmp);
        let chk = true, n;
        for(let i=0;i<N;i++) {
            n = chkMap(arr, i);
            if(firstRet[i] !== n) {
                chk = false;
                break;
            }
        }
        if(chk) {
            // console.log(tmp)
            ret = Math.min(ret, tmp.length);
        }
        return;
    }
    tmp.push(lines[cnt]);
    go(tmp, cnt+1, firstRet);
    tmp.pop();
    go(tmp, cnt+1, firstRet);
}

function first_draw() {
   const arr = Array.from({length:M}, () => Array.from({length:N}, () => Array(N)));
   draw(arr, lines)
   const firstRet = [];
   for(let i=0;i<N;i++) {
     firstRet.push(chkMap(arr, i));
   }
   return firstRet;
}

function Solution() {
    const fistRet = first_draw();
    go([], 0, fistRet)
    console.log(ret);
}

Solution();