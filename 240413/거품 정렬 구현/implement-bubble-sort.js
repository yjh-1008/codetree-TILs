const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

const bouble_sort =() => {
    const length = arr.length;

    for(let i=0;i<length-1;i++) {
        for(let j=0;j<length-1-i;j++) {
            if(arr[j] > arr[j+1]) {
                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;

            } 
        }
    }

    console.log(arr.join(" "));
}

bouble_sort();