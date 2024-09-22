#include <algorithm>
#include <iostream>
using namespace std;
int n;
int R[205], B[205];
int dp[205][105];
void Initialize() {
  dp[0][0] = 0;
  for (int i = 1; i <= n; i++)
    dp[i][0] = dp[i - 1][0] + B[i];

  for (int i = 1; i <= n; i++)
    dp[n + i][0] = dp[n + i - 1][0] + R[n + i];
}
int main() {
  cin >> n;
  for (int i = 1; i <= 2 * n; i++)
    cin >> R[i] >> B[i];

  Initialize();

  for (int i = 1; i <= 2 * n; i++) {
    for (int j = 1; j <= n; j++) {
      if (i < j)
        continue;

      if (i != j)
        dp[i][j] = max(dp[i][j], dp[i - 1][j] + B[i]);

      dp[i][j] = max(dp[i][j], dp[i - 1][j - 1] + R[i]);
    }
  }

  cout << dp[2 * n][n];
  return 0;
}