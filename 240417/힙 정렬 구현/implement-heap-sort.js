const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
let nums = input[1].split(" ").map(Number);

function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapify(arr, i){
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  if(left < arrLen && arr[left] > arr[max]){
    max = left;
  }
  
  if(right < arrLen && arr[right] > arr[max]){
    max = right;
  }
  
  if(max != i){
    swap(arr, i, max);
    heapify(arr, max);
  }
}

function heapSort(arr){
  arrLen = arr.length;

  for(let i = Math.floor(arrLen / 2); i >= 0; i--){
    heapify(arr, i);
  }
  
  for(let i = arrLen - 1; i > 0; i--){
    swap(arr, 0, i);
    arrLen--;
    
    heapify(arr, 0);
  }
  
  return arr;
}
console.log(heapSort(nums).join(" "))