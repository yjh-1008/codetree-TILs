const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].trim().split(" ").map(Number);
let  arr = [];
for(let i=1;i<=N;i++){
    arr.push(Number(input[i]))
}

function exist() {
    let cnt = 1;
    for(let i=1;i<arr.length;i++) {
        if(arr[i-1]===arr[i]) {
            cnt+= 1;
            if(cnt >= M) return true;
        }else {
            cnt= 1;
        }
    }
    return false;
}

function Solution() {
    while(exist()) {
        let tmp = [];
        let cnt = 0;
        for(let i=0;i<arr.length;i++) {
            if(tmp.at(-1) === arr[i]) {
                tmp.push(arr[i]);
                cnt += 1;
                
            }else {
                tmp.push(arr[i]);
                cnt = 1;
            }
            // console.log(tmp)
            if(cnt == M) {
                for(let j=0;j<M;j++) {
                    tmp.pop();
                }
                cnt = 0;
            }
        }
        arr = tmp;
       
    }
     console.log(`${arr.length}\n${arr.join("\n")}`);
}

Solution();