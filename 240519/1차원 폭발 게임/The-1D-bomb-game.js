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
            // console.log(i, cnt);
            //cnt가 M보다 작으면 값을 넣는다 cnt만큼 값을 추가하고 i를 증가시킨다.
            if(cnt < M) {
                for(let k=0;k<cnt;k++) {
                    tmp.push(arr[i]);
                }

                i+=cnt-1;
            } else {
                i+=cnt-1;
            }
            //cnt가 크거나 같으면 추가하지 않고 i를 증가시킨다
           
        }
 
        arr = tmp;
    }
    console.log(`${arr.length}\n${arr.join("\n")}`);
}

Solution();