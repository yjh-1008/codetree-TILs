import java.util.*;

public class Main {
    public static int N, M, gold, max, cnt, map[][],move[][];
    public static int[] dr = {-1,0,1,0};
    public static int[] dc = {0,1,0,-1};
    public static boolean visited[][];
    public static Queue<Node> q = new LinkedList<>();
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        N = sc.nextInt();
        M = sc.nextInt();
        map = new int[N][N];
        visited = new boolean[N][N];
        for(int i=0;i<N;i++){
            for(int j=0;j<N;j++){
                map[i][j] = sc.nextInt();
                if(map[i][j]==1){
                    gold++;
                }
            }
        }
        for(int i=0;i<N;i++){
            for(int j=0;j<N;j++){
                push(i,j);
                Max_gold();
            }
        }
        System.out.println(max);
    }

    public static void push(int x,int y){
        visited[x][y] = true;
        q.add(new Node(x,y));
    }

    public static void Max_gold(){
        Node th = q.poll();
        for(int t=N-1;t>=0;t--){
            if(gold*M < cost(t) && t!=0){continue;}
            visited = new boolean[N][N];
            move = new int[N][N];
            cnt = 0;
            q.add(th);
            while(!q.isEmpty()){
                Node now = q.poll();
                visited[now.x][now.y] = true;
                if(move[now.x][now.y] <= t && map[now.x][now.y]==1){cnt++;}
                if(move[now.x][now.y]> t){
                    continue;}
                for(int i=0;i<4;i++){
                    int nx = now.x + dr[i];
                    int ny = now.y + dc[i];
                    if(canGo(nx,ny)){
                        move[nx][ny] = move[now.x][now.y] + 1;
                        push(nx,ny);
                    }
                }
            }
            int tmp = cnt*M;
            if(tmp >= cost(t)){
                max = Math.max(max,cnt);
            }
            cnt = 0;
        }
    }

    public static int cost(int x){
        return x * x + ( x + 1) * (x + 1);
    }

    public static boolean isRange(int x,int y){
        return 0 <= x && x < N && 0 <= y && y < N;
    }
    public static boolean canGo(int x,int y){
        if(!isRange(x,y)){return false;}
        if(visited[x][y]){return false;}
        return true;
    }

    static class Node {
        int x, y;
        public Node(int x,int y){
            this.x = x;
            this.y = y;
        }
    }
}