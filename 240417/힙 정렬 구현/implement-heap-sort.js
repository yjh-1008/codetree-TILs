const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
let nums = input[1].split(" ").map(Number);

const heapify = (arr, lastIdx) => {
  let idx = parseInt(lastIdx/2)-1;
  while(idx >= 0) {
    const left = arr[idx*2+1];
    const right = arr[idx*2+2];

    if(left >= right && arr[idx] < left) {
      let tmp = arr[idx];
      arr[idx*2+1] = tmp;
      arr[idx] = left;
    } else if(right > left && arr[idx] < right) {
      let tmp = arr[idx];
      arr[idx*2+2] = tmp;
      arr[idx] = right;
    }
    idx--;
  }
  return arr;
}

const heap_sort = (arr, n) => {

  for(let i=arr.length-1; i>=0;i--) {
    arr = heapify(arr, i);
    if(arr[0] > arr[i]) {
      let tmp = arr[i];
      arr[i] = arr[0];
      arr[0] = tmp;
    }
  }
  console.log(arr.join(" "));
}

heap_sort(nums, N)