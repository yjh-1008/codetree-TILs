import sys

def shift(x, y, w, h, move_dir):
    if move_dir == 0:
        dxs = [-1, -1, 1, 1]
        dys = [1, -1, -1, 1]
        move_nums = [w, h, w, h]
    else:
        dxs = [-1, -1, 1, 1]
        dys = [-1, 1, 1, -1]
        move_nums = [h, w, h, w]
    
    # Step1. temp 배열에 board 값을 복사합니다.
    for i in range(n):
        for j in range(n):
            temp[i][j]=board[i][j]

    # Step2. 기울어진 직사각형의 경계를 쭉 따라가면서 shift
    for dx, dy, move_num in zip(dxs, dys, move_nums):
        for _ in range(move_num):
            nx = x + dx
            ny = y + dy
            temp[nx][ny] = board[x][y]
            x = nx 
            y = ny
    
    # Step3. temp값을 board에 옮겨줍니다.
    for i in range(n):
        for j in range(n):
            board[i][j]=temp[i][j]


if __name__=="__main__":
    # 변수 선언 및 입력:
    n = int(input())
    board = [list(map(int, input().split())) for _ in range(n)]
    temp = [[0 for _ in range(n)] for _ in range(n)]


    x, y, m1, m2, m3, m4, d = tuple(map(int, input().split()))
    shift(x-1, y-1, m1, m2, d)

    for b in board:
        print(*b)