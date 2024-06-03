import java.io.*;
import java.util.*;

public class Main {

    static final int UP = 0;
    static final int DOWN = 1;
    static final int RIGHT = 2;
    static final int LEFT = 3;

    static int T;
    static int N;
    static int M;
    static int[][] arr;
    static List<int[]> gems;
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, 1, -1};

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st;

        T = Integer.parseInt(br.readLine());
        
        for (int tc=0; tc<T; tc++) {
            st = new StringTokenizer(br.readLine(), " ");
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());

            arr = new int[N][N];
            gems = new ArrayList<>();

            for (int i=0; i<M; i++) {
                st = new StringTokenizer(br.readLine(), " ");
                int x = Integer.parseInt(st.nextToken()) - 1;
                int y = Integer.parseInt(st.nextToken()) - 1;
                String d = st.nextToken();
                int direction = parseDirection(d);

                gems.add(new int[]{x, y, direction});
                arr[x][y]++;
            }

            int time = 0;
            while (time++ < N * 2 + 2) {
                simulate();
            }

            sb.append(gems.size()).append("\n");
        }

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    private static int parseDirection(String direction) {
        if (direction.equals("U")) {
            return UP;
        }
        if (direction.equals("D")) {
            return DOWN;
        }
        if (direction.equals("R")) {
            return RIGHT;
        }
        return LEFT;
    }

    private static void simulate() {
        for (int[] gem : gems) {
            int x = gem[0];
            int y = gem[1];
            int direction = gem[2];

            int nx = x + dx[direction];
            int ny = y + dy[direction];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
                direction = direction % 2 == 0 ? direction + 1 : direction - 1;
                gem[2] = direction;
                continue;
            }
            arr[x][y]--;
            arr[nx][ny]++;
            gem[0] = nx;
            gem[1] = ny;
        }

        for (int i=0; i<N; i++) {
            for (int j=0; j<N; j++) {
                if (arr[i][j] >= 2) {
                    arr[i][j] = 0;
                    remove(i, j);
                }
            }
        }
    }

    private static void remove(int x, int y) {
        List<int[]> removeList = new ArrayList<>();

        for (int[] gem : gems) {
            int gx = gem[0];
            int gy = gem[1];

            if (gx == x && gy == y) {
                removeList.add(gem);
            }
        }

        for (int[] remove : removeList) {
            gems.remove(remove);
        }
    }
}