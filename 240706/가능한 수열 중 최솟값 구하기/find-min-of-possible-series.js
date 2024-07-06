const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const N = Number(input);
const nums = [4,5,6];
let ret = Number.MAX_VALUE;

function isSame(str1, str2) {
    for(let i=0;i<str1.length;i++) {
        if(str1[i] !== str2[i]) return false;
    }
    return true;
}

function avaliable(arr) {
    for(let t=1;t<N;t++) {
        for(let i=0;i<=N-t-t;i++) {
            const str1 = arr.slice(i, i+t);
            const str2 = arr.slice(i+t, i+t+t);
            if(isSame(str1, str2)) return false;
        }
    }
    return true;
}

function go(arr) {
   if(arr.length === N) {
        if(ret <= Number(arr.join(""))) return;
        const chk = avaliable(arr);
        if(chk) {
            ret = Number(arr.join(""));
        }
        return;
   }
  
   nums.forEach((item) => {
    arr.push(item);
    go(arr);
    arr.pop();
   })
}

function Solution() {
    go([]);
    // ret.sort((a,b) => {
    //     return Number(a) - Number(b);
    // })
    console.log(ret)
}

Solution();