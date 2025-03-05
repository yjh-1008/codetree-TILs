const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const str1 = input[0];
const str2 = input[1];
const dp = Array.from({length:str1.length}, () => {
    return Array(str2.length).fill(0);
})
// Please write your code here.
function Solution() {
    dp[1][1] = str1[0] === str2[0] ? 1 : 2;

    for(let i=1;i<=str1.length;i++) {
        for(let j=1;j<=str2.length;j++) {
            if(str1[i-1] === str2[j-1]) {
                dp[i][j] = dp[i-1][j-1]+1
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
            }
        } 
    }

    return dp[str1.length][str2.length];
}

const ret = Solution();
console.log(ret)