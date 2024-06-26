const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("");
const N = Number(input.length);

function isCalc(val) {
    if(val === '+' || val ==='-' || val ==='*') return true;
    return false;
}
let ret = 0;

function module(a, mod, b) {
    if(mod === '+') {
        return a+b;
    } else if(mod === '-') {
        return a-b;
    } else {
        return a*b;
    }
}

function clac(arr) {
    let mod = null, st = [];
    arr.forEach((item) => {
        if(isCalc(item)) {
            mod = item;
        } else {
            if(st.length) {
                let str = module(st.pop(), mod, item)
                st.push(str);
                mod = null;
            } else {
                st.push(item);
            }
        }
    })
    ret = Math.max(st.pop(), ret);
}   

function go(cur, arr) {
    if(cur === N) {
        clac(arr);
        return;
    }
    for(let i=cur;i<N;i++) {
        if(isCalc(input[cur])) go(cur+1, arr);
        else {
            for(let i=1;i<=4;i++){
                let tmp = arr[cur];
                arr[cur] = i;
                go(cur+1, arr);
                arr[cur] = tmp;
            }
        }
    }
}

function Solution() {
    //input을 돌며 연산이 아닌 경우에는 1부터 4까지 대입.
    //대입이 끝나면 순서대로 연산.
    //연산인 경우에 cal을 변경 call이 Null이 아닌 경우에는 연산을 해야한다는 뜻.
    //배열에서 빼내고 연산 진행 후 결과값 넣음.
    const arr = Array.from(input);
    go(0, arr);
    console.log(ret)
}

Solution();