#include <algorithm>
#include <climits>
#include <iostream>
using namespace std;

int n, ans = INT_MIN;
int coin[100005];
int dp[1005][4];

void Initialize() {
  
  for (int i = 0; i <= n; i++)
    for (int j = 0; j <= 3; j++)
      dp[i][j] = INT_MIN;
  dp[0][0] = 0;
}

int main() {
  cin >> n;
  for (int i = 1; i <= n; i++)
    cin >> coin[i];

  Initialize();

  for (int i = 0; i <= n; i++) {
    for (int j = 0; j <= 3; j++) {
      if (dp[i][j] == INT_MIN)
        continue;

      if (i + 1 <= n && j + 1 <= 3)
        dp[i + 1][j + 1] = max(dp[i + 1][j + 1], dp[i][j] + coin[i + 1]);

      if (i + 2 <= n)
        dp[i + 2][j] = max(dp[i + 2][j], dp[i][j] + coin[i + 2]);
    }
  }

  for (int i = 0; i <= 3; i++)
    ans = max(ans, dp[n][i]);
  cout << ans;
  return 0;
}