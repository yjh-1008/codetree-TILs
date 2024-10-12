#include <iostream>
#include <vector>
#include <math.h>

using namespace std;

int N;
int M;
int dp[201][201][201]; // m일차에 n번 옷을 입고, m - 1일차에 pre번 옷을 입었을 때 만족도의 최대값
vector<int> s;
vector<int> e;
vector<int> v;

int go(int m, int n, int pre)
{
    // 기저 사례 : 모든 날짜를 고려하면 0, 옷의 종류를 벗어나면 최소값 리턴
    if(m > M) return 0;
    if(n >= N) return -987654321;
    // 이미 계산되었다면 해당 값을 리턴
    if(dp[m][n][pre] != -1) return dp[m][n][pre];
    // 계산
    if(s[n] > m || e[n] < m) dp[m][n][pre] = go(m, n + 1, pre); // 해당 날짜에 입을 수 없는 옷이라면?
    else if(pre == 200) dp[m][n][pre] = max(go(m, n + 1, pre), go(m + 1, 0, n)); // 이전에 선택된 옷이 없다면? -> n번째 옷을 안 입는 경우와 입는 경우로 나눔
    else dp[m][n][pre] =  max(go(m, n + 1, pre), go(m + 1, 0, n) + abs(v[n] - v[pre])); // 이전에 선택된 옷이 있다면 -> n번째 옷을 안 입는 경우와 입는 경우로 나눔
    return dp[m][n][pre];
}

int main() {
    // 입력부 
    cin >> N >> M;
    for(int i = 0; i < N; i++)
    {
        int ss, ee, vv;
        cin >> ss >> ee >> vv;
        s.push_back(ss);
        e.push_back(ee);
        v.push_back(vv);
    }

    fill(&dp[0][0][0], &dp[0][0][0] + 201 * 201 * 201, -1);

     // 1번째날 0번째 옷을 입은 것으로 출발, 이전에 선택된 옷이 없기때문에 사용하지 않는 값인 200으로 매개변수를 설정하여 호출 
    go(1, 0, 200);

    // 출력부
    cout << dp[1][0][200] << "\n";

    return 0;
}