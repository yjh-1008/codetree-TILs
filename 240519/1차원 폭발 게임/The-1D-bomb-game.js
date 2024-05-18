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
    return cnt === M;
}

function Solution() {
    while(arr.length && exist()) {
        let tmp = [];
        
        for(let i=0;i<arr.length;i++) {
            let cnt = 1;
            for(let j=i+1;j<arr.length;j++) {
                if(arr[i] === arr[j]) {
                    cnt += 1;
                } else {
                    break;
                }
            }
            // arr.splice()
            // console.log(arr[i], cnt);
            if(cnt < M) {
                for(let j=0;j<cnt;j++) {
                    tmp.push(arr[i]);
                }
            } else i+= cnt-1;

        }
        // console.log(tmp)
        arr = tmp;
    }
    console.log(`${arr.length}\n${arr.join("\n")}`);
}

Solution();