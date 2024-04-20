const fs = require('fs');
const N = parseInt(fs.readFileSync(0).toString().trim());

const Solution = () => {
 const arr = [];
 for(let i=1;i<=N;i++) arr.push(i);
 while(arr.length > 1) {
    arr.shift();
    arr.push(arr.shift())
 }
 console.log(arr[0])
}

Solution();