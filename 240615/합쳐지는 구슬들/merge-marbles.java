import java.io.*;
import java.util.*;

public class Main {

    static int n;
    static int m;
    static int t;
    static int[][] grid;
    static List<Gem> gems;
    static int[] dx = {-1, 0, 0, 1};
    static int[] dy = {0, -1, 1, 0};
    static int[] mapper;
    static int maxWeight;

    private static void initMapper() {
        mapper = new int['Z'];
        mapper['U'] = 0;
        mapper['L'] = 1;
        mapper['R'] = 2;
        mapper['D'] = 3;
    }

    static class Gem {
        int x;
        int y;
        int direction;
        int weight;
        int number;

        public Gem(int x, int y, int direction, int weight, int number) {
            this.x = x;
            this.y = y;
            this.direction = direction;
            this.weight = weight;
            this.number = number;
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

        grid = new int[n][n];
        gems = new ArrayList<>();
        initMapper();

        for (int num=1; num<=m; num++) {
            st = new StringTokenizer(br.readLine(), " ");
            int r = Integer.parseInt(st.nextToken()) - 1;
            int c = Integer.parseInt(st.nextToken()) - 1;
            int direction = mapper[st.nextToken().charAt(0)];
            int weight = Integer.parseInt(st.nextToken());

            grid[r][c]++;
            gems.add(new Gem(r, c, direction, weight, num));
        }

        while (t-- > 0) {
            simulate();
        }

        for (Gem gem : gems) {
            maxWeight = Math.max(maxWeight, gem.weight);
        }

        sb.append(gems.size()).append(" ").append(maxWeight);

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    private static void simulate() {
        for (Gem gem : gems) {
            int nx = gem.x + dx[gem.direction];
            int ny = gem.y + dy[gem.direction];

            if (isOutRange(nx, ny)) {
                gem.direction = 3 - gem.direction;
                continue;
            }

            grid[gem.x][gem.y]--;
            grid[nx][ny]++;
            gem.x = nx;
            gem.y = ny;
        }

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                if (grid[i][j] > 1) {
                    int sumWeight = 0;

                    PriorityQueue<Gem> pq = new PriorityQueue<>((o1, o2) -> Integer.compare(o2.number, o1.number));
                    for (Gem gem : gems) {
                        if (gem.x == i && gem.y == j) {
                            pq.offer(gem);
                            sumWeight += gem.weight;
                        }
                    }

                    Gem gem = pq.poll();
                    gem.weight = sumWeight;

                    while (!pq.isEmpty()) {
                        gems.remove(pq.poll());
                    }

                    grid[i][j] = 1;
                }
            }
        }
    }

    private static boolean isOutRange(int x, int y) {
        return x < 0 || x >= n || y < 0 || y >= n;
    }
}