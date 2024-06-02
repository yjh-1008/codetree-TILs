const fs= require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));
const dy = [-1,-1,-1,0,1,1,1,0];
const dx = [-1,0,1,1,1,0,-1,-1];
const RAGNE = dy.length;

function isRange(r, c) {
    if(r< 0||r>=N || c<0 || c>=N) return false;
    return true;
}

function changeArea(r, c) {
    let minVal = -1, cr = -1, cc=-1;
    for(let i=0;i<RAGNE;i++) {
        const ny = dy[i]+r, nx = dx[i]+c;
        if(!isRange(ny, nx))continue;
        if(minVal < arr[ny][nx]) {
            minVal = arr[ny][nx];
            cr = ny;
            cc = nx;
        }
    }
    // console.log(cr, cc);
    return [cr,cc];
}

function swap(r, c, cr, cc) {
    // console.log(r, c, cr, cc);
    let tmp = arr[r][c];
    arr[r][c] = arr[cr][cc];
    arr[cr][cc] = tmp;
}
 
function Solution() {
    for(let t=0;t<M;t++) {
        //숫자를 찾아야함.
       for(let k=1;k<=N*N;k++) {
         let r=-1, c=-1;;
        for(let i=0;i<N;i++) {
            for(let j=0;j<N;j++) {
                if(arr[i][j] ===k) {
                    r = i;
                    c=j;
                    break;
                }
            }
            if(r > -1 && c>-1) break;
        }

        const [cr, cc] = changeArea(r, c);
        swap(r, c, cr, cc);
       }


    }
    let ret= ''
    arr.map((item) => {
        ret += item.join(" ")+'\n'
    })
    console.log(ret)
}


Solution();