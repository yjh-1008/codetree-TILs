const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
let arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));
let ret = 0;
function chk(tmp) {
    let cnt = 0, n=[0,0];
    tmp.forEach((item) => {
        if(n[0] > item[1] || n[1] < item[0]) {
            cnt += 1;
            n = item;
        }
    })
    // console.log(tmp, cnt)
    return cnt;
}

function go(tmp, cnt) {
    if(cnt === N) {
        ret = Math.max(chk(tmp), ret);
        return;
    }

    tmp.push(arr[cnt]);
    go(tmp, cnt+1);
    tmp.pop();
    go(tmp, cnt+1);
}

function Solution() {
    //정렬을 진행한 다음 가야함.
    arr.sort((a, b) => {
        if(a[0] === b[0]) {
            return a[1]-b[1];
        } else {
            return a[0]-b[0];
        }
    })
    //최대 길이가 정해져있지 않음.
    //그냥 반복문으로 재귀를 타면 됨.
    go([], 0)

    console.log(ret)
}

Solution();