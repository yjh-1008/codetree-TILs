import sys
sys.stdin=open(0, 'r')


def get_area(k):
    return k * k + (k + 1) * (k + 1)


def in_range(x, y):
    return 0 <= x and x < n and 0 <= y and y < n


# 주어진 k에 대하여 채굴 가능한 금의 개수를 반환합니다.
def get_num_of_gold_in_border(row, col, k):
    # 방향에 따라 바뀌는 x와 y의 변화량을 정의합니다.
    dxs = [1, 1, -1, -1]
    dys = [-1, 1, 1, -1]
    
    if k == 0:
        return grid[row][col]
    
    # 겉에 부분만 핥기 
    num_of_gold = 0
    curr_x, curr_y = row - k, col # 순회 시작점 설정
    for dx, dy in zip(dxs, dys):
        for _ in range(k):
            if in_range(curr_x, curr_y):
                num_of_gold += grid[curr_x][curr_y]

            curr_x = curr_x + dx
            curr_y = curr_y + dy
    
    return num_of_gold


if __name__=="__main__":
    # 변수 선언 및 입력
    n, m = tuple(map(int, input().split()))
    grid = [list(map(int, input().split())) for _ in range(n)]

    max_gold = 0

    for row in range(n):
        for col in range(n):
            num_of_gold = 0
            for k in range(2 * (n - 1) + 1):        # k=0, k=1, k=2
                # 이전 k까지 구한 금의 개수에
                # 해당 k의 모서리에 존재하는 금의 개수를 더해줍니다.
                num_of_gold += get_num_of_gold_in_border(row, col, k)
                
                # 손해를 보지 않으면서 채굴할 수 있는 최대 금의 개수를 저장합니다.
                if num_of_gold * m >= get_area(k):
                    max_gold = max(max_gold, num_of_gold)

    print(max_gold)