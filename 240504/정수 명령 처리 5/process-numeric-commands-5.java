import java.util.*;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.BufferedReader;
public class Main {
    public static void main(String[] args) throws IOException {
        // 여기에 코드를 작성해주세요.
        StringBuilder sb = new StringBuilder();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        Stack stack = new Stack();

        StringTokenizer st;
        for(int i=0;i<N;i++){
            st = new StringTokenizer(br.readLine());
            String str = st.nextToken();
            if(str.equals("push_back")){
                stack.push(Integer.parseInt(st.nextToken()));
            }else if(str.equals("pop_back")){
                stack.pop();
            }else if(str.equals("size")){
                sb.append(stack.size()).append("\n");
            }else if(str.equals("get")){
                sb.append(stack.get(Integer.parseInt(st.nextToken())-1)).append("\n");
            }
        }

        System.out.println(sb);
    }
}