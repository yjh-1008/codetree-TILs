const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [y, x] = input[0].split(" ").map(Number);

const arr = Array.from({length:y}, () => new Array(y));
let ret = 0;

for(let i=1;i<1+y;i++) {
    arr[i-1] = input[i].split(" ").map(Number);
}

for(let i=0;i<y;i++) {
    let chk = 1;
    for(let j=0;j<y;j++) {
        if(j > 0) {
            if(arr[i][j-1] === arr[i][j]) {
                chk+=1;
            } else {
                chk = 1;
            }
         
        } 
        
        if(chk >= x) {
            ret+=1;
            break;
        } 
    }
}

for(let j=0;j<y;j++) {
    let chk = 1;
    for(let i=0;i<y;i++) {
        if(i > 0) {
            if(arr[i][j] === arr[i-1][j]) {
                chk+=1;
            } else {
                chk = 1;
            }
            
        }
        if(chk >= x) {
            ret+=1;
            break;
        }
    }
}

console.log(ret);