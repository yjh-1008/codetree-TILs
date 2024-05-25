n = int(input())
x, y = map(int, input().split())
x -= 1
y -= 1
miro = [list(str(input())) for _ in range(n)]

dx = [0, 1, 0, -1]
dy = [1, 0, -1, 0]
dirt = 0

# 현재 위치
cur_point = miro[x][y]

def is_in_range(right_x, right_y) :
    return 0 <= right_x < n and 0 <= right_y < n

# 같은 곳을 반복하는지 체크하는 함수
def repeat_check(go_x, go_y, dirt) :
    global visited

    if [go_x, go_y, dirt] in visited :
        return True
    
    visited.append([go_x, go_y, dirt])

# 회전을 여러 번 할 경우 - 위치 체크 함수
def same_diff_dirt_check(x, go_x, y, go_y, dirt) :
    while True :
        if x == go_x and y == go_y : 
            dirt, go_x, go_y = move_and_block_check(x, y, dirt)
            
        if x != go_x or y != go_y : 
            return dirt, go_x, go_y
        
        if repeat_check(go_x, go_y, dirt) :
            return dirt, go_x, go_y

# 이동할 위치에 따라 방향 설정 & 이동
def move_and_block_check(x, y, dirt) :
    # 전진할 좌표 설정
    go_x = x + dx[dirt]
    go_y = y + dy[dirt]
    if is_in_range(go_x, go_y) and miro[go_x][go_y] == '#' :
        #print('전진할 곳에 벽 있음')

        # 반시계 방향 설정
        dirt = (dirt + 3) % 4
        #print('반시계 방향 설정 : ', dirt)

        # 이동을 하지 않기 때문에 원래 위치 리턴, 바뀐 방향 리턴
        return dirt, x, y
            
    elif is_in_range(go_x, go_y) and miro[go_x][go_y] == '.' :
        #print('전진할 곳에 벽 없음')
        cur_point = miro[go_x][go_y]
        #print('전진할 곳으로 전진함 : ', go_x, go_y)

        # 이동하기 때문에 이동할 위치 리턴, 원래 방향 리턴
        return dirt, go_x, go_y
    elif not is_in_range(go_x, go_y) : # 격자에서 벗어나는 경우
        return dirt, go_x, go_y # 벗어난 위치를 리턴

# 오른쪽에 벽이 있는지 없는지 체크
def right_wall_check(x, y, dirt) :
    
    global go_x, go_y 

    # 오른쪽 방향 설정
    right_dirt = (dirt + 1) % 4

    right_x = x + dx[right_dirt] 
    right_y = y + dy[right_dirt] 

    if is_in_range(right_x, right_y) and miro[right_x][right_y] == '#' :
        #print('오른쪽에 벽 있음')
        #print('move_and_block_check 실행')
        dirt, go_x, go_y = move_and_block_check(x, y, dirt)
        dirt, go_x, go_y = same_diff_dirt_check(x, go_x, y, go_y, dirt)

    elif is_in_range(right_x, right_y) and miro[right_x][right_y] == '.' :
        #print('오른쪽에 벽 없음')

        # 시계방향으로 90도 회전함
        dirt = (dirt + 1) % 4

        #print('move_and_block_check 실행')
        dirt, go_x, go_y = move_and_block_check(x, y, dirt)
        dirt, go_x, go_y = same_diff_dirt_check(x, go_x, y, go_y, dirt)

    else : # 격자를 벗어나는 경우
        return dirt, go_x, go_y 
    
    return dirt, go_x, go_y 

cnt = 0

# 방문한 곳 저장 
visited = []
while True :
    dirt, x, y = right_wall_check(x, y, dirt)
    cnt += 1

    if not is_in_range(x, y) :
        break

    if repeat_check(go_x, go_y, dirt) :
        cnt = -1
        break

print(cnt)