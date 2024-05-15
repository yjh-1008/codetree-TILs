const fs = require('fs');
const str = fs.readFileSync(0).toString().trim().split("");
const N = str.length;

function zipStr(str) {
    let cnt = 0;
    let newStr = [str[0]];
    str.forEach((s) => {
        if(newStr.at(-1) === s) {
            cnt+=1;
        } else {
            newStr.push(cnt);
            cnt=1;
            newStr.push(s)
        }
    })
    newStr.push(cnt);
    // console.log(str, newStr);
    return newStr.join("").length;
}

function Solution() {
    let ret = Infinity;

    for(let i=0;i<N;i++) {
        str.unshift(str.pop());
        ret = Math.min(zipStr(str), ret);
    }

    console.log(ret);
}

Solution();