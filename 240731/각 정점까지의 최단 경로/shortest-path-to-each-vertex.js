const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const start = +input[1]-1;
const graph =Array.from({length:N}, () => []);
input.slice(2, input.length).forEach((item) => {
    const [a, b, c] = item.split(" ").map(Number);
    graph[a-1].push([b-1, c]);
    graph[b-1].push([a-1, c])
})
let ret = []
function Solution() {
    const q = [];
    const d = Array(N).fill(Infinity);
    d[start] = 0;
    q.push([start,0]);
    while(q.length) {
        const [cur, dist] = q.shift();
        if(d[cur] < dist) continue;

        for(const value of graph[cur]) {
            const [node, weight] = value;

            if(d[node] > weight + dist) {
                d[node] = weight+dist;
                // ret[node] +=1;
                q.push([node, weight+dist]);
                q.sort((a, b) => a[1] - b[1]);
            }
        }
    }

    d.forEach((item) => {
        const val = item === Infinity ? -1 : item;
        ret.push(val);
    })

    console.log(ret.join("\n").trim())
}

Solution();