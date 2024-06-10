import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws IOException {
        // 여기에 코드를 작성해주세요.
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int []arr = new int[n];
        for(int i=0;i<n;i++){
            arr[i] = Integer.parseInt(st.nextToken());
        }

        int min;
        for(int j=0;j<n-1;j++){
            min=j;
            for(int i=j+1;i<n;i++){
                if(arr[i]<arr[min]){
                    min=i;
                }
            }
            int tmp=arr[min];
            arr[min]=arr[j];
            arr[j]=tmp;
        }
        
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<n;i++){
            sb.append(arr[i]).append(" ");
        }
        System.out.println(sb);
    }
}