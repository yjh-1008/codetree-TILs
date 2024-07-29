from collections import deque

# get input
n, k = map(int, input().split())
a = [list(map(int, input().split())) for _ in range(n)]
r, c = map(int, input().split())

def in_range(x, y):
    return x >= 0 and x < n and y >= 0 and y < n

def can_go(x, y, value):
    if not in_range(x, y):
        return False
    if a[x][y] >= value:
        return False
    if visited[x][y]:
        return False
    return True

def bfs(value):
    global q, visited
    global max_val, max_pos

    dxs = [-1, 1, 0, 0]
    dys = [0, 0, -1, 1]

    while q:
        x, y = q.popleft()

        for dx, dy in zip(dxs, dys):
            nx = x + dx
            ny = y + dy
            if can_go(nx, ny, value):
                visited[nx][ny] = True
                q.append((nx, ny))
                max_val = max(max_val, a[nx][ny]) # max_val 초기값이 0이므로 첫 탐색시 무조건 max pos에 입력되는 것을 방지

    for i in range(n):
        for j in range(n):
            if visited[i][j] and a[i][j] == max_val:
                max_pos.append((i, j))


ans = (r - 1, c - 1)
x, y = r - 1, c - 1

for _ in range(k):
    q = deque()

    max_val = 0
    max_pos = []
    visited = [[False] * n for _ in range(n)]

    visited[x][y] = True
    q.append((x, y))
    value = a[x][y]
    # print(f'{_ + 1} init : \tx={x + 1} y={y + 1}, value={value}')
    bfs(value)
    if not max_pos:
        break
    max_pos.sort(key=lambda temp: (temp[0], temp[1])) # 정렬하여 우선순위 도출
    print(f'max_val: {max_val} \t max_pos: {max_pos}')
    x, y = max_pos[0]
    ans = max_pos[0]

print(ans[0] + 1, ans[1] + 1)