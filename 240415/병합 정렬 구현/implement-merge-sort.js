const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const nums = input[1].split(" ").map(Number);


const merge_sort = (arr, low, high) => {
  if(low < high) {
    const mid = Math.floor((low+high)/2);
    merge_sort(arr, low, mid);
    merge_sort(arr, mid+1, high);
    merge(arr, low, mid, high);
  }

} 
const ret = new Array(N);
const merge = (arr, low, mid, high) => {
  let i = low, j = mid+1;
  let k = low;

  while(i<= mid && j<= high) {
    if(arr[i] < arr[j]) {
      ret[k++] = arr[i++];
    } else {
      ret[k++] = arr[j++];
    }
  }

  while(i<=mid) {
    ret[k++] = arr[i++];
  }

  while(j<=high) {
    ret[k++] = arr[j++];
  }

  for(let k=low;k<=high;k++) {
    arr[k] = ret[k];
  };
  return arr;
}

merge_sort(nums, 0, N-1);
console.log(nums.join(" "));