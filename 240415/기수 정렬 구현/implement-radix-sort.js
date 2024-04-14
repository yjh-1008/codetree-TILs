const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
const arr1 = input[1].split(" ").map(Number);
const len = mostDigits(arr1);

function getDigit(num,i) {
	return Math.floor(Math.abs(num) / Math.pow(10, i) % 10);
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

const radix_sort = (arr, k) => { //k는 자릿수
    for(let pos = 0; pos<k;pos++) {
        const arr_new = Array.from({length: 10}, () => []);
        for(let i=0;i<arr.length;i++) {
            const digit = getDigit(arr[i], pos);
            arr_new[digit].push(arr[i]);
        }
        const store_arr = [];
        for(let i=0;i<10;i++){
            for(let j=0;j<arr_new[i].length;j++) {
              store_arr.push(arr_new[i][j])
            }
        }
        // console.log( store_arr);
        arr = store_arr;
    }
    console.log(arr.join(" "));
}


radix_sort(arr1, len);