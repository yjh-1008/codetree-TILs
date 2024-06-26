const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
let inIdx = 0;
let T = parseInt(input[inIdx++]);
const RANGE = 1000;
const MOVE_OBJ = {
    'U':0,
    'D':1,
    'R':2,
    'L':3
}
const dy = [-1,1,0,0];
const dx = [0,0,1, -1];
function clearArray() {
    return Array.from({length:RANGE+1}, () => new Array(RANGE+1).fill(''));
}

function isRange(y, x) {
    if(y<= RANGE * -1 || y>=RANGE || x<= RANGE * -1 || x>=RANGE) return false;
    return true;
}

function compare(arr1, arr2) {
    if(Number(arr1[2]) === arr2[2]) {
        if(Number(arr1[4]) > arr2[4]) {
            return arr1
        }
        return arr2;
    }
    if(Number(arr1[2]) > arr2[2]) {
        return arr1;
    }
    return arr2;
}

function move(q, time) {
    let chk = false;
    let nq = [];
    q.forEach((item, idx) => {
        const [r, c,w, d, i] = item;
        const moveIdx = MOVE_OBJ[d];
        const ny = r+dy[moveIdx], nx = c+dx[moveIdx];
        if(isRange(ny, nx)) {
            const findIndex = nq.findIndex((item) => {
                return item[0] === ny && item[1] === nx;
            })
            // console.log(nq, ny, nx)
            if(findIndex > -1) {
                // console.log('here');
                const bigger = compare(nq[findIndex], item);
                nq = [...nq.slice(0, findIndex), ...nq.slice(findIndex+1)];
                nq.push(bigger);
                chk = true;
            } else {
                nq.push(item);
            }
        }

    })
    return [nq, chk];
}
 
function Solution() {
    let ret = ``

    while(T) {
        const N = parseInt(input[inIdx++]);
        let q=[];
        for(let i=1;i<=N;i++) {
            let [r, c, w, d] = input[inIdx++].trim().split(" ");
            r = Number(r), c=Number(c), w=Number(w);
            // const ay = Math.abs(RANGE+r)-1, ax = Math.abs(RANGE+c)-1;
            q.push([r, c,w, d, i]);
        }
        // console.log(q)
        let time = 0;
        while(time++ < 4000) {
            // const nextGrid = clearArray();
            const [nq, chk] = move(q, time);
            // console.log(nq)
            if(chk) {
                q= nq;
            } else {
                ret += time === 0 ? -1 : time*2;
                ret+= '\n';
                break;
            }
        }
        T--;
    }
    console.log(ret)
}

Solution();