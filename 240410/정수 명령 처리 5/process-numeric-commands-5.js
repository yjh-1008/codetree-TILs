const fs = require('fs');
const input= fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const solution = () => {
    const arr = []
    for(let i=1;i<=N;i++) {
        const [cmd, num] = input[i].split(" ");

        if(cmd === 'push_back') {
            arr.push(num);
        }else if(cmd === 'get') {
            console.log(arr[num-1]);
        }else if(cmd === 'size') {
            console.log(arr.length);
        } else {
            arr.pop();
        }
    }
}

solution();