const fs = require('fs');
const input = fs.readFileSync(0).toString().trim();
const n = Number(input);
const nums = [4,5,6];
let ret = Number.MAX_VALUE;

let num = [];

function possible() {
    for (let i = 1; i <= Math.floor(num.length / 2); i++) {
        for (let j = 0; j < num.length - i; j++) {
            if (num.slice(j, j + i).join('') === num.slice(j + i, j + i + i).join('')) {
                return false;
            }
        }
    }
    return true;
}

function find_min(cnt) {
    if (cnt === n) {
        let ans = '';
        for (let j of num) {
            ans += j;
        }
        console.log(ans);
        return;
    }

    for (let i = 4; i <= 6; i++) {
        num.push(String(i));
        if (possible()) {
            find_min(cnt + 1);
            if (num.length === n) {
                return;
            }
        }
        num.pop();
    }
}

find_min(0);