import java.util.*;
import java.io.*;

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

        boolean sorted;
        do{
            sorted = true;
            for(int i=0;i<n-1;i++){
                if(arr[i]>arr[i+1]){
                    int tmp = arr[i];
                    arr[i]=arr[i+1];
                    arr[i+1]=tmp;
                    sorted=false;
                }
            }
        }while(sorted==false);

        StringBuilder sb=new StringBuilder();
        for(int i=0;i<n;i++){
            sb.append(arr[i]).append(" ");
        }

        System.out.println(sb);
    }
}