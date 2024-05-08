//처음은 L은 stack R은 queue
const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n, m, q] = input[0].split(" ").map(Number);
const arr = [];
for(let i=1;i<=n;i++) {
    arr[i-1] = input[i].trim().split(" ").map(Number)
}
const cmds = [];
for(let i=1+n;i<1+n+q;i++) {
    cmds.push(input[i]);
}

function sameTile(arr1, arr2) {
    for(let i=0;i<m;i++) {
        if(arr1[i] === arr2[i]) return true;
    }
    return false;
}

function go(col, dirNum, isUp) {
    if(isUp) {
        for(let i=col;i>=1;i--) {
            if(!sameTile(arr[i], arr[i-1])) return;
            if(dirNum) {
                arr[i-1].unshift(arr[i-1].pop());
            } else {
                arr[i-1].push(arr[i-1].shift());
            }
            dirNum = !dirNum;
        }
    } else {
        for(let i=col;i<n-1;i++) {
            if(!sameTile(arr[i], arr[i+1])) return;
            if(dirNum) {
                arr[i+1].unshift(arr[i+1].pop());
            } else {
                arr[i+1].push(arr[i+1].shift());
            }
            dirNum = !dirNum;
        }
    }
}
 
function Solution() {
    for(let i=0;i<cmds.length;i++) {
        const [col, dir] = cmds[i].split(" ");
        //true이면 stack false면 queue
        let dirNum = dir === 'L' ? true: false;
        if(dirNum) {
            arr[col-1].unshift(arr[col-1].pop());
        } else {
            arr[col-1].push(arr[col-1].shift());
        }

        go(col-1, !dirNum, true);
        go(col-1, !dirNum, false);
    }
    let ret = '';
    arr.forEach((item) => {
        ret += item.join(" ")+"\n"
    })
    console.log(ret.trim())
}

Solution();