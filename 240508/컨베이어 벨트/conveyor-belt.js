const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n, t] = input[0].split(" ").map(Number);
const over = input[1].trim().split(" ").map(Number);
const down = input[2].trim().split(" ").map(Number);

//초가 반복될 동안
// console.log(down)
//over에 pop() down에 unshift(), over에 unsfhit() down에 pop(); 
for(let i=0;i<t;i++) {
    // console.log(over);
    const tmp1 = over.pop();
    const tmp2 = down.pop();
    // console.log(tmp1)
    // console.log(tmp2)
    down.unshift(tmp1);
    over.unshift(tmp2);
}

console.log(over.join(" "))
console.log(down.join(" "))