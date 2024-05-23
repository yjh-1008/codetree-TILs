import java.util.Scanner; 

public class Main {
    public static final int DIR_NUM = 4; 
    public static final int MAX_N = 50;

    public static final int[] dx = new int[]{-1,0,1,0};
    public static final int[] dy = new int[]{0,1,0,-1};
    
    public static int n, ans;

    public static int[][] orgGrid = new int[MAX_N][MAX_N];
    public static int[][] grid = new int[MAX_N][MAX_N];
    public static int[][] temp = new int[MAX_N][MAX_N];
    public static boolean[][] visited = new boolean[MAX_N][MAX_N];

    public static void initializeGrid() {
        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                grid[i][j] = orgGrid[i][j];
            }
        }
    }

    public static void initializeVisited() {
        for (int i=0; i<n ;i++) {
            for (int j=0; j<n; j++) {
                visited[i][j] = false; 
            }
        }
    }

    public static boolean inRange(int x, int y) {
        return 0<=x && x<n && 0<=y && y<n;
    }

    public static void initializeTemp() {
        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                temp[i][j] = 0;
            }
        }
    }

    public static void explode(int x, int y, int power) {
        for (int d=0; d<DIR_NUM; d++) {
            for (int p=0; p<power; p++){
                int nx = x + dx[d]*p;
                int ny = y + dy[d]*p;
                
                if (inRange(nx, ny)) {
                    grid[nx][ny] = 0;
                }
            }
        }
    }

    // **i, j 확인 순서 주의
    public static void drop() {  
        initializeTemp();

        for (int j=0; j<n; j++) {
            int currIdx = n-1; 

            for (int i=n-1; i>=0; i--) {
                if (grid[i][j] == 0) continue;  // *빠지면 안됨
                temp[currIdx--][j] = grid[i][j];
            }
        }

        // grid 업데이트: temp
        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                grid[i][j] = temp[i][j];
            }
        }
    }

    public static int cntPair() {
        initializeVisited();  // *초기화 필수: 시간 많이 잡아먹힘
        int ret = 0;

        for (int x=0; x<n; x++) {
            for (int y=0; y<n; y++) {
                if (grid[x][y] == 0) continue;

                for (int d=0; d<DIR_NUM; d++) {
                    int nx = x+dx[d];
                    int ny = y+dy[d];

                    if (inRange(nx, ny) && (grid[x][y]==grid[nx][ny]) && (!visited[x][y]||!visited[nx][ny])) {
                        ret ++; 
                        visited[x][y] = true;
                        visited[nx][ny] = true;
                    }
                }
            }
        }
        return ret;
    }

    public static int pairCnt(int x, int y) {
        initializeGrid();
        int ret = -1;

        explode(x, y, grid[x][y]);
        drop();
        ret = Math.max(ret, cntPair());

        return ret;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                orgGrid[i][j] = sc.nextInt();
            }
        }

        initializeGrid();

        for (int i=0; i<n; i++) { 
            for (int j=0; j<n; j++){
                ans = Math.max(ans, pairCnt(i, j));
            } 
        }
        
        System.out.println(ans);
    }
}