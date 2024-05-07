const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");

let [n, t] = input[0].split(" ").map(Number);
const arr = [];
for(let i=1;i<=3;i++) {
    arr[i-1] = input[i].split(" ").map(Number);
}

function Solution() {
    //t초동안 진행하며,
    // console.log(arr);
    while(t) {
        let tmp = 0;
        for(let i=0;i<3;i++) {
            //i가 0인 경우에는 값을 빼기만하고
            if(i === 0) {
                tmp = arr[i].pop();
            } else if(i === 1) {
                //0<i<n-1인 경우에는 arr[i].unshift(tmp) arr.pop()
                arr[i].unshift(tmp);
                tmp = arr[i].pop();
            } else if(i===2){
             
                //i가 n-1이라면 arr[i].unshift(tmp) arr[0].unsfhit(arr[i].pop())
                arr[i].unshift(tmp);
                // console.log(arr[i], i);
                tmp = arr[i].pop();
                arr[0].unshift(tmp);
            }
        }
        t--;
    }
    let ret = '';
    arr.forEach((item) => {
        ret += `${item.join(" ")}\n`;
    })
    console.log(ret.trim());
}

Solution();