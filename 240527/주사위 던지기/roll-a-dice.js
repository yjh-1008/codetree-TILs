const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let [n,m,r,c] = input[0].trim().split(" ").map(Number);
const cmds = input[1].trim().split(" ");
const arr = Array.from({length:n}, () => new Array(n).fill(0))
function isRange(r, c) {
    if(r < 0 || r>=n || c< 0 || c>=n) return false;
    return true;
}

//주사위 위 앞 오른쪽
const dice = [1,2,3];
const MAX = 7;
function getReverseNumber(n) {
    return Math.abs(MAX-n);
}
function Solution() {
    r -= 1, c-=1;
    let ret = 0;
    arr[r][c]= 6;
    // console.log(cmds.length)
    cmds.forEach((dir) => {
        const n = Move_obj[dir];
        let before = getReverseNumber(dice[0]);
        const my = r+dy[n], mx = c+dx[n]; 
        // console.log(my, mx);
        if(isRange(my, mx)) {
            const num = getReverseNumber(dice[0]);
            if(dir === 'L') {
                dice[0] = dice.pop();
                dice.push(num);
                // re = getReverseNumber(arr[0]);
            } else if(dir === 'D') {
                let tmp = dice[1];
                dice[1] = dice[0];
                dice[0] = getReverseNumber(tmp);
            } else if(dir === 'R') {
                let tmp = dice[0];
                dice[0] = getReverseNumber(dice[2]);
                dice[2] = tmp;
            } else if(dir=== 'U'){
                let tmp = dice[0];
                dice[0] = dice[1];
                dice[1] = getReverseNumber(tmp);
            }
            // console.log(dice);
            let re = getReverseNumber(dice[0]);
            arr[my][mx] = re
            r = my, c = mx;
        }

    })

    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(arr[i][j] > 0) ret += arr[i][j]
        }
    }
    // console.log(arr);
    console.log(ret)
}
const dy = [0,1,0,-1];
const dx = [-1,0,1,0];
const Move_obj = {
    'L' : 0,
    'D': 1,
    'R': 2,
    'U' : 3
}

Solution();