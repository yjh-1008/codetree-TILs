const fs = require('fs');
const N = parseInt(fs.readFileSync(0).toString().trim());

const Solution = () => {
 let arr = [];
 for(let i=1;i<=N;i++) arr.push(i);
 while(arr.length > 1) {
    arr = arr.slice(1);
    arr = [...arr.slice(1), arr[0]];
 }
 console.log(arr[0])
}

Solution();