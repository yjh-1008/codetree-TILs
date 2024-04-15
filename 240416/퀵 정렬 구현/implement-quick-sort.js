const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const nums = input[1].split(" ").map(Number);

const pivot_sort =(arr) => {
  if(arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for(let i=1;i<arr.length;i++) {
    if(arr[i] <= pivot) {
      left.push(arr[i]);
    } else if(arr[i] > pivot) {
      right.push(arr[i]);
    } 
  }

  const lsort = pivot_sort(left);
  const rsort = pivot_sort(right);

  return [...lsort, pivot,...rsort ]
}

console.log(pivot_sort(nums).join(" "));