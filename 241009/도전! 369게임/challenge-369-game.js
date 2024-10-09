const fs = require('fs');
const N = +fs.readFileSync(0).toString()

const Solution = () => {
    let answer = 0;
    for(let i=1;i<=N;i++) {
        if(i%3 === 0) {
            // console.log(i)
            answer++;
        }
        else if(i.toString().includes('3') || i.toString().includes('6')|| i.toString().includes('9')) {
            //  console.log(i)
            answer++
        }
    }

    console.log(answer)
}

Solution()