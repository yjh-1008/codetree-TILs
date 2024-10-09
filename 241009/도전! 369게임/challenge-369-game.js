const fs = require('fs');
const N = +fs.readFileSync(0).toString()

const Solution = () => {
    let answer = 0;
    for(let i=1;i<=N;i++) {
        if(i%3 === 0) {
            // console.log(i)
            answer++;
        }
        else {
            for(const n of i.toString()) {
                if(n == 3 || n == 6 || n ==9) {
                    answer++;
                    break;
                }
            }
            // answer++
        }
    }

    console.log(answer)
}

Solution()