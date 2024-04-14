const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const arr1 = input[1].split(" ").map(Number);
const len = arr1.reduce((maxLen, item) => Math.max(maxLen, item.toString().length),0)

function getDigit(num,i) {
	return Math.floor(Math.abs(num) / Math.pow(10, i) % 10);
}

const radix_sort = (arr, k) => { //k는 자릿수
    for(let pos = k-1; pos>=0; pos--) {
        const arr_new = Array.from({length: 10}, () => new Array());
        for(let i=0;i<arr.length;i++) {
            const digit = getDigit(arr[i], pos);
            arr_new[digit].push(arr[i]);
        }
        const store_arr = [];
        // console.log(arr_new)
        for(let i=0;i<10;i++){
            arr_new[i].forEach((item) => {
                store_arr.push(item);
        })
        }
        
        arr = store_arr;
    }
    console.log(arr.join(" "));
}


radix_sort(arr1, len);