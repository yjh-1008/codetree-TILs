const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1, input.length).map((item) =>{
    return item.split(" ").map(Number);
})
const LEN = 1001
const dp = Array(LEN+1).fill(0)
const Solution = () => {
    // console.log(arr)
 //dp = i번째의 알바를했을 때 얻을 수 있는 최대 금액.
 for(let i=0;i<N;i++) {
    dp[i] = arr[i][2];
 }
 const isCross = (cs, ce, ps, pe) => {
    // console.log(pe, cs)
    return pe >= cs;
 }

 for(let i=0;i<N;i++) {
    const [cs, ce, cp] = arr[i];
    for(let j=0;j<i;j++) {
        const [ps, pe, pp] = arr[j];
        if(isCross(cs, ce, ps, pe)) {
            //겹쳐있다면, 겹친 값 중에서 더 큰 값을 선택한다
            let max = Math.min(pp, cp);
            if(dp[i] < cp) dp[i] = max
        } else {
            if(dp[i] < dp[j]+cp) {
                dp[i] = dp[j] + cp;
            }
        }
    }
 }
//  console.log(dp);
 console.log(Math.max(...dp))
}

Solution();