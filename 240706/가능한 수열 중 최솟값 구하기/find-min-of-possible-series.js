const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const N = Number(input);
const nums = [4,5,6];
let ret = [];
function avaliable(arr) {
    const n = arr.length
    for(let t=1;t<n;t++) {
        for(let i=0;i<n-t;i++) {

            const str1 = arr.slice(i, i+t);
            const str2 = arr.slice(i+t, i+t+t);

            // console.log(str1, str2);
            if(str1.join("") === str2.join("")) return false;
        }
    }
    return true;
}

function go(arr) {
   if(arr.length === N) {
        const chk = avaliable(arr);
        if(chk) {
            ret.push(arr.join(""));
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
    ret.sort((a,b) => {
        return Number(a) - Number(b);
    })
    console.log(ret[0])
}

Solution();