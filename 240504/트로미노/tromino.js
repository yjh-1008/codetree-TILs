const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = Array.from({length:N}, () => new Array(M));

for(let i=1;i<1+N;i++) {
    arr[i-1] = input[i].split(" ").map(Number);
}
// console.log(arr);
let ret = 0;

for(let i=0;i<N;i++) {
    for(let j=0;j<M;j++) {
        //ㄴ자 검사
        if(i-1 >= 0 && j+1 < M) {
            const sum = arr[i][j] + arr[i-1][j] + arr[i][j+1];
            ret = Math.max(ret, sum);
        }

        if(i-1 >= 0 && j-1 >= 0) {
              const sum = arr[i][j] + arr[i-1][j] + arr[i][j-1];
            ret = Math.max(ret, sum);
        }

        if(i+1 < N && j-1 >= 0) {
              const sum = arr[i][j] + arr[i+1][j] + arr[i][j-1];
            ret = Math.max(ret, sum);
        }

        if(i+1 < N && j+1 < M) {
            const sum = arr[i][j] + arr[i+1][j] + arr[i][j+1];
            ret = Math.max(ret, sum);
        }

        // ㅡ검사
        if(j-1 >= 0 && j+1 <M) {
            const sum = arr[i][j] + arr[i][j-1] + arr[i][j+1];
            ret = Math.max(ret, sum);
        }

        if(i-1 >= 0 && i+1<N) {
            const sum = arr[i][j] + arr[i-1][j] + arr[i+1][j];
            ret = Math.max(ret, sum);
        }
    }
}

console.log(ret)