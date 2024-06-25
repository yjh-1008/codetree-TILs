import java.io.*;
import java.util.*;

public class Main {

    static int N;
    static int M;
    static int C;
    static int[][] grid;
    static int partialMaxValue;
    static int maxValue;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());

        grid = new int[N][N];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine(), " ");
            for (int j = 0; j < N; j++) {
                grid[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        boolean[][] isStolen = new boolean[N][N];
        List<int[]> steals = new ArrayList<>();
        findMaxValue(0, isStolen, steals);

        sb.append(maxValue);

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    private static void findMaxValue(int depth, boolean[][] isStolen, List<int[]> steals) {
        if (depth == 2) {
            int value = 0;
            for (int[] steal : steals) {
                if (canSteal(steal)) {
                    value += getValue(steal);
                    continue;
                }
                int targetDepth = 0;
                partialMaxValue = 0;

                while (++targetDepth < M) {
                    List<Integer> partials = new ArrayList<>();
                    findPartialMaxValue(0, targetDepth, 0, 0, steal, partials);
                }
                value += partialMaxValue;
            }
            maxValue = Math.max(maxValue, value);
            return;
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N - M + 1; j++) {
                if (isUsed(isStolen, i, j)) {
                    continue;
                }
                int[] steal = getSteal(i, j);
                markSteal(isStolen, i, j, true);
                steals.add(steal);

                findMaxValue(depth + 1, isStolen, steals);

                markSteal(isStolen, i, j, false);
                steals.remove(steal);
            }
        }
    }

    private static boolean isUsed(boolean[][] isStolen, int x, int y) {
        for (int j = y; j < y + M; j++) {
            if (isStolen[x][j]) {
                return true;
            }
        }
        return false;
    }

    private static boolean canSteal(int[] steal) {
        int sum = 0;
        for (int st : steal) {
            sum += st;
        }
        return sum <= C;
    }

    private static boolean canPartialSteal(List<Integer> partials) {
        int sum = 0;
        for (Integer part : partials) {
            sum += part;
        }
        return sum <= C;
    }

    private static void markSteal(boolean[][] isStolen, int x, int y, boolean flag) {
        for (int j = y; j < y + M; j++) {
            isStolen[x][j] = flag;
        }
    }

    private static int[] getSteal(int x, int y) {
        int[] steal = new int[M];
        for (int j = y; j < y + M; j++) {
            steal[j - y] = grid[x][j];
        }
        return steal;
    }

    private static void findPartialMaxValue(int depth, int targetDepth, int idx, int sum, int[] steal, List<Integer> partials) {
        if (depth == targetDepth && canPartialSteal(partials)) {
            partialMaxValue = Math.max(partialMaxValue, getPartialValue(partials));
            return;
        }

        for (int i = idx; i < steal.length; i++) {
            Integer part = steal[i];
            if (sum + part > C) {
                continue;
            }
            partials.add(part);
            findPartialMaxValue(depth + 1, targetDepth, i + 1, sum + part, steal, partials);
            partials.remove(part);
        }
    }

    private static int getPartialValue(List<Integer> partials) {
        int value = 0;
        for (Integer partial : partials) {
            value += partial * partial;
        }
        return value;
    }

    private static int getValue(int[] steal) {
        int value = 0;
        for (int i = 0; i < steal.length; i++) {
            value += steal[i] * steal[i];
        }
        return value;
    }
}