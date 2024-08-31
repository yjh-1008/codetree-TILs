const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((v) => {
    return v.split(" ").map(Number);
});
const dp = Array(1001).fill(1);

function Solution() {
    arr.sort((a,b) => {
        if(a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    })

    dp[0] = 1;

    for(let i=1;i<N;i++) {
        for(let j=0;j<i;j++) {
            if(arr[j][1] < arr[i][0]) {
                if(dp[i] < dp[j]+1) {
                    dp[i] = dp[j]+1;
                }
            }
        }
    }
    console.log(Math.max(...dp));
}

Solution();