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
    for (let i = 1; i <= Math.floor(arr.length / 2); i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr.slice(j, j + i).join('') === arr.slice(j + i, j + i + i).join('')) {
                return false;
            }
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