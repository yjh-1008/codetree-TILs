const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);
const selection_sort = () => {
    for(let i=0;i<arr.length;i++) {
        let min = i
        for(let j=i+1;j<arr.length;j++) {
            if(arr[j] < arr[min]) {
               min = j;
            }
        }
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
    }
    console.log(arr.join(" "));
}

selection_sort()