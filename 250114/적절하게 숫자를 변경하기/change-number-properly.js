//비슷하 수열: 순서대로 읽었을때, 인접한 두 숫자가 다른 횟수가 M번 이하
//유사도: 같은 위치에 같은 원소가 나온 횟수

//비슷한수열일때, 유사도가 높은 수열 => 인접한 두 숫자가 다른 횟수가 M번 이하인 수열 중에서 유사도가 가장 높은 수열의 개수

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const resultArr = Array(N+1).fill(0);
function getSimilar(arr) {
    let count = 0;
    for(let i=0;i<N-1;i++) {
        if(arr[i] !== arr[i+1]) count++;
    }
    return count;
}

function getSimilarRate(arr1, arr2) {
    let count = 0;
    for(let i=0;i<N;i++) {
        if(arr1[i] === arr2[i]) count++;
    }
    return count;
}


function go(arr) {
    if(arr.length === N) {
        // console.log(getSimilar(arr), arr);
        if(getSimilar(arr) <= M) {
            const idx = getSimilarRate(arr, nums);
            resultArr[idx] += 1;
        }
        return;
    }
    for(let i=1;i<=4;i++) {
        arr.push(i);
        go(arr);
        arr.pop();
    }
}

function Solution() {
    go([])

   for(let i=N;i>=0;i--) {
    if(resultArr[i] > 0) {
        console.log(i)
        return;
    }
   }
}

Solution();