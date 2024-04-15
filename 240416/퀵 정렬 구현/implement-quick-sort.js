const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const nums = input[1].split(" ").map(Number);

const quickSort = function (arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  const lSorted = quickSort(left);
  const rSorted = quickSort(right);
  return [...lSorted, pivot, ...rSorted];
};

console.log(quickSort(nums).join(" "));