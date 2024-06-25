const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N,M,C] = input[0].split(" ").map(Number);
const arr = input.slice(1, input.length).map((item) => item.trim().split(" ").map(Number));

function compare(lt, rt, idx) {
    let tmp = 0;
    for(let i=lt; i<=rt;i++) {
        tmp += Math.pow(arr[idx][i] , 2);
    }
    return tmp;
}

function getMaxNum(idx) {
    // console.log(idx)
    let lt = 0, rt=0, num=arr[idx][0], max = -1, maxLt=0, maxRt= 0;
    while(rt < N) {
        if(rt - lt+1 > M) {
            num -= arr[lt];
            lt+= 1;
        } else {
            if(num > C) {
                num -= arr[idx][lt];
                lt += 1;

            } else {
                rt += 1;
                num += arr[idx][rt];

            }
        }
        if(num > C || rt - lt + 1 > M) continue;
        if(num > max) {
            max = num;
            maxLt = lt;
            maxRt = rt;
        } else if(num === max ){
            const A = compare(lt, rt, idx);
            const B = compare(maxLt, maxRt, idx);
            if(A > B) {
                maxLt = lt;
                maxRt = rt;
            }
        }
    }

    while(lt < N) {
        num -= arr[idx][lt];
        lt += 1;
        if(num < max) {
            break;
        } else {
            const A = compare(lt, rt, idx);
            const B = compare(maxLt, maxRt, idx);
            if(A > B) {
                max = num;
                maxLt = lt;
                maxRt = rt;
            }
        }
    }
    const tmpRet = compare(maxLt, maxRt, idx);
    return tmpRet;
}

function Solution() {
    const max_nums = new Array(N).fill(0);
    //슬라이딩 윈도우로 M개 이전까지의 값 중 C보다 작은 Range를 구한다.
    for(let i=0;i<N;i++) {
        max_nums[i] = getMaxNum(i);
    }
    let ret = 0;
    for(let i=0;i<N;i++) {
        for(let j=i+1;j<N;j++) {
            ret = Math.max(max_nums[i]+max_nums[j],ret);
        }
    }
    console.log(ret);
}

Solution();