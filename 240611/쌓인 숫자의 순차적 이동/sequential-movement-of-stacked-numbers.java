import java.io.*;
import java.util.*;

public class Main {

    static int n;
    static int m;
    static int t;
    static int k;
    static int[][] grid;
    static int[] mapper = new int['Z' + 1];
    static int[] dx = {-1, 0, 0, 1};
    static int[] dy = {0, 1, -1, 0};
    static List<Gem> gems = new ArrayList<>();
    static int gemCount;

    private static void initMapper() {
        mapper['U'] = 0;
        mapper['D'] = 3;
        mapper['R'] = 1;
        mapper['L'] = 2;
    }

    static class Gem {
        int x;
        int y;
        int number;
        int direction;
        int speed;

        Gem(int x, int y, int number, int direction, int speed) {
            this.x = x;
            this.y = y;
            this.number = number;
            this.direction = direction;
            this.speed = speed;
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());
        t = Integer.parseInt(st.nextToken());
        k = Integer.parseInt(st.nextToken());

        grid = new int[n][n];
        initMapper();

        for (int i=0; i<m; i++) {
            st = new StringTokenizer(br.readLine(), " ");
            int r = Integer.parseInt(st.nextToken()) - 1;
            int c = Integer.parseInt(st.nextToken()) - 1;
            int d = mapper[st.nextToken().charAt(0)];
            int v = Integer.parseInt(st.nextToken());

            gems.add(new Gem(r, c, i + 1, d, v));
            grid[r][c]++;
        }

        while (t-- > 0) {
            simulate();
            // print();
        }

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                if (grid[i][j] != 0) {
                    gemCount += grid[i][j];
                }
            }
        }

        sb.append(gemCount);

        bw.write(sb.toString());
        // bw.close();
        // br.close();
    }

    private static void simulate() {
        for (Gem gem : gems) {
            int speed = 0;

            while (speed++ < gem.speed) {
                int nx = gem.x + dx[gem.direction];
                int ny = gem.y + dy[gem.direction];

                if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
                    gem.direction = 3 - gem.direction;
                    speed--;
                    continue;
                }

                grid[gem.x][gem.y]--;
                grid[nx][ny]++;
                gem.x = nx;
                gem.y = ny;
            }
        }

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                if (grid[i][j] > k) {
                    PriorityQueue<Gem> pq = new PriorityQueue<>((gem1, gem2) -> { 
                        if (gem1.speed == gem2.speed) {
                            return Integer.compare(gem1.number, gem2.number);
                        } 
                        return Integer.compare(gem1.speed, gem2.speed);
                    });

                    for (Gem gem : gems) {
                        if (gem.x == i && gem.y == j) {
                            pq.add(gem);
                        }
                    }

                    while (pq.size() > k) {
                        Gem gem = pq.poll();
                        gems.remove(gem);
                    }

                    grid[i][j] = k;
                }
            }
        }
    }
}