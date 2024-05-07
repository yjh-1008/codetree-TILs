const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [n, t] = input[0].split(" ").map(Number);
const over = input[1].split(" ").map(Number);
const down = input[2].split(" ").map(Number);

//초가 반복될 동안

//over에 pop() down에 unshift(), over에 unsfhit() down에 pop(); 
for(let i=0;i<t;i++) {
    down.unshift(over.pop());
    over.unshift(down.pop());
}

console.log(over.join(" "))
console.log(down.join(" "))