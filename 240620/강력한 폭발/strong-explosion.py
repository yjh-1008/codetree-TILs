import sys
sys.setrecursionlimit(10 ** 6)

def cnt_bomb():
    loc = []
    for i in range(bomb_cnt):
        if bomb[i] == 1:
            y = bomb_loc[i][1]
            for x in range(-2, 3):
                if 0 <= bomb_loc[i][0] + x < n:
                  if (bomb_loc[i][0] + x, y) not in loc:
                      loc.append((bomb_loc[i][0] + x, y))
        elif bomb[i] == 2:
            for dx, dy in (0, 0), (0, 1), (0, -1), (1, 0), (-1, 0):
                if 0 <= bomb_loc[i][0] + dx < n and 0 <= bomb_loc[i][1] + dy < n:
                    if (bomb_loc[i][0] + dx, bomb_loc[i][1] + dy) not in loc:
                        loc.append((bomb_loc[i][0] + dx, bomb_loc[i][1] + dy))
        else:
            for dx, dy in (0, 0), (1, 1), (1, -1), (-1, -1), (-1, 1):
                if 0 <= bomb_loc[i][0] + dx < n and 0 <= bomb_loc[i][1] + dy < n:
                    if (bomb_loc[i][0] + dx, bomb_loc[i][1] + dy) not in loc:
                        loc.append((bomb_loc[i][0] + dx, bomb_loc[i][1] + dy))

    return len(loc)

def is_most(now, most_bomb):
    if now == bomb_cnt:
        cnt = cnt_bomb()
        if most_bomb < cnt:
            most_bomb = cnt
        return most_bomb
    for i in range(1, 4):
        bomb.append(i)
        most_bomb = is_most(now + 1, most_bomb)
        bomb.pop()
    return most_bomb

n = int(input())
grid = [list(map(int, input().split())) for _ in range(n)]
bomb_cnt = 0
bomb_loc = []
bomb = []
# 폭탄의 위치 및 개수 계산
for i in range(n):
    for j in range(n):
        if grid[i][j] == 1:
            bomb_cnt += 1
            bomb_loc.append((i, j))

print(is_most(0, 0))