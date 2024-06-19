import java.io.*;
import java.util.*;

public class Main {

    static int n;
    static int[][] grid;
    static int[][] dx = {{-2, -1, 1, 2}, {-1, 0, 1, 0}, {-1, -1, 1, 1}};
    static int[][] dy = {{0, 0, 0, 0}, {0, 1, 0, -1}, {-1, 1, 1, -1}};
    static List<int[]> bombPositions;
    static int bombSize;
    static int[] bombs;
    static int maxArea;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st;

        n = Integer.parseInt(br.readLine());
        grid = new int[n][n];
        bombPositions = new ArrayList<>();

        for (int i=0; i<n; i++) {
            st = new StringTokenizer(br.readLine(), " ");
            for (int j=0; j<n; j++) {
                grid[i][j] = Integer.parseInt(st.nextToken());

                if (grid[i][j] == 1) {
                    bombPositions.add(new int[]{i, j});
                }
            }
        }

        bombSize = bombPositions.size();
        bombs = new int[bombSize];

        calculateMaxArea(0);

        sb.append(maxArea);

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    private static void calculateMaxArea(int depth) {
        if (depth == bombSize) {
            maxArea = Math.max(maxArea, getArea());
            return;
        }

        for (int i=0; i<3; i++) {
            bombs[depth] = i;
            calculateMaxArea(depth + 1);
        }
    }

    private static int getArea() {
        int area = 0;
        int[][] copiedGrid = copyGrid();

        for (int i=0; i<bombSize; i++) {
            int[] pos = bombPositions.get(i);
            int x = pos[0];
            int y = pos[1];

            for (int j=0; j<4; j++) {
                int nx = x + dx[bombs[i]][j];
                int ny = y + dy[bombs[i]][j];

                if (inRange(nx, ny)) {
                    copiedGrid[nx][ny]++;
                }
            }
        }

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                if (copiedGrid[i][j] > 0) {
                    area++;
                }
            }
        }

        return area;
    }

    private static int[][] copyGrid() {
        int[][] newGrid = new int[n][n];

        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                newGrid[i][j] = grid[i][j];
            }
        }

        return newGrid;
    }

    private static boolean inRange(int x, int y) {
        return x >= 0 && x < n && y >= 0 && y < n;
    }
}