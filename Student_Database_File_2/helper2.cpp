#include <bits/stdc++.h>
using namespace std;
int main()
{
    for (int i = 1; i <= 4; i++)
    {
        int l,m,t_id,c_id;
        if(i==1)
        {
            l=2105001,m=2105054,t_id=5001,c_id=5201;
        }
        else if(i==2)
        {
            l=2205001,m=2205010,t_id=5004,c_id=5101;
        }
        else if(i==3)
        {
            l=2005001,m=2005010,t_id=5007,c_id=5301;
        }
        else
        {
            l=1905001,m=1905010,t_id=5008,c_id=5401;
        }

        for (int j = l; j <= m; j++)
        {
            int t = t_id, c = c_id;
            cout << "(" << j << ", " << t << ", " << c << ")," << endl;
            t++, c++;
            cout << "(" << j << ", " << t << ", " << c << ")," << endl;
            t++, c++;
            cout << "(" << j << ", " << t << ", " << c << ")," << endl;
        }
    }
}