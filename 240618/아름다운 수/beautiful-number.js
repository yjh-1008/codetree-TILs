const fs = require('fs');
const N = Number(fs.readFileSync(0).toString());

let ret = 0;

function chkNum(arr) {
    let i=0
    //i가 0일 때에는 처음숫자이므로 그 숫자를 카운팅.
    //그 숫자만큼 cnt가 올라가지 않았다면 chk= false;
    //끝까지 반복했을 때 chk를 리턴
    while(i < arr.length) {
        if(i + arr[i] -1 >= N) {
            return false;
        }

        for(let j=i;j<i+arr[i];j++) {
            if(arr[j] != arr[i]) {
                return false;
            }
        }
        i += arr[i];
    }
    return true;
}

function go(arr) {
    //arr.length가 N과 같을때, 문자열을 검사한다.
    //for문을 돌면서 숫자의 개수를 체크, 틀리면 false
    if(arr.length === N) {
        if(chkNum(arr)) {
            // console.log(arr);
            ret += 1;
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
    go([]);
    console.log(ret)
}

Solution();