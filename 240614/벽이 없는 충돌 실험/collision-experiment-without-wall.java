import java.io.*;
import java.util.*;

public class Main {

    static int T;
    static int N;
    static int[] mapper = new int['Z' + 1];
    static double[] dx = {-0.5, 0.0, 0.0, 0.5};
    static double[] dy = {0.0, -0.5, 0.5, 0.0};
    static List<Gem> gems;
    static int time;
    static int lastCrashTime;

    private static void initMapper() {
        mapper['L'] = 0;
        mapper['D'] = 1;
        mapper['U'] = 2;
        mapper['R'] = 3;
    }

    static class Coordinate {
        double x;
        double y;

        public Coordinate(double x, double y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Coordinate that = (Coordinate) o;

            if (Double.compare(that.x, x) != 0) return false;
            return Double.compare(that.y, y) == 0;
        }

        @Override
        public int hashCode() {
            int result;
            long temp;
            temp = Double.doubleToLongBits(x);
            result = (int) (temp ^ (temp >>> 32));
            temp = Double.doubleToLongBits(y);
            result = 31 * result + (int) (temp ^ (temp >>> 32));
            return result;
        }
    }

    static class Gem {
        double x;
        double y;
        int number;
        int direction;
        int weight;

        Gem(double x, double y, int number, int direction, int weight) {
            this.x = x;
            this.y = y;
            this.number = number;
            this.direction = direction;
            this.weight = weight;
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st;

        T = Integer.parseInt(br.readLine());

        for (int tc = 0; tc < T; tc++) {
            N = Integer.parseInt(br.readLine());
            gems = new ArrayList<>();
            lastCrashTime = -1;
            initMapper();

            for (int num = 1; num <= N; num++) {
                st = new StringTokenizer(br.readLine(), " ");

                double x = Double.parseDouble(st.nextToken());
                double y = Double.parseDouble(st.nextToken());
                int w = Integer.parseInt(st.nextToken());
                int d = mapper[st.nextToken().charAt(0)];

                gems.add(new Gem(x, y, num, d, w));
            }

            time = 0;
            while (time++ < 4000) {
                simulate();
            }
            sb.append(lastCrashTime).append("\n");
        }

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    private static void simulate() {
        Map<Coordinate, List<Gem>> map = new HashMap<>();
        for (Gem gem : gems) {
            gem.x = gem.x + dx[gem.direction];
            gem.y = gem.y + dy[gem.direction];

            Coordinate coordinate = new Coordinate(gem.x, gem.y);
            if (map.containsKey(coordinate)) {
                map.get(coordinate).add(gem);
            } else {
                List<Gem> list = new ArrayList<>();
                list.add(gem);
                map.put(coordinate, list);
            }
        }

        for (Map.Entry<Coordinate, List<Gem>> entry : map.entrySet()) {
            if (entry.getValue().size() > 1) {
                lastCrashTime = time;
                PriorityQueue<Gem> pq = new PriorityQueue<>((o1, o2) -> {
                    if (o1.weight == o2.weight) {
                        return Integer.compare(o2.number, o1.number);
                    }
                    return Integer.compare(o2.weight, o1.weight);
                });

                for (Gem gem : entry.getValue()) {
                    pq.offer(gem);
                }
                pq.poll();
                while (!pq.isEmpty()) {
                    gems.remove(pq.poll());
                }
            }
        }

    }
}