from collections import deque
n, k = map(int,input().split())
graph = [list(map(int,input().split())) for _ in range(n)]
visited = [[0 for _ in range(n)] for _ in range(n)]
q = deque([])
dxs, dys = [1,0,-1,0], [0,1,0,-1]
r, c = map(int,input().split())
r, c = r - 1, c - 1
key = 0

def in_range(x,y):
    return 0 <= x and x < n and 0 <= y and y < n

def can_go(x,y):
    return in_range(x,y) and visited[x][y] == 0 and graph[x][y] < key

def bfs():
    global MAX
    while q:
        x, y = q.popleft()
        for dx, dy in zip(dxs,dys):
            ndx, ndy = x + dx, y + dy
            if can_go(ndx, ndy):
                q.append([ndx,ndy])
                visited[ndx][ndy] = 1
                MAX = max(MAX,graph[ndx][ndy])

check_break = True
for _ in range(k):
    MAX = 0
    check = False
    q.append([r,c])
    key = graph[r][c]
    bfs()
    for i in range(n):
        for j in range(n):
            if not check and graph[i][j] == MAX:
                r, c = i, j
                check = True
    if not check:
        print(r + 1,c + 1)
        check_break = False
        break
    visited = [[0 for _ in range(n)] for _ in range(n)]

if check_break:
    print(r + 1,c + 1)