#include<bits/stdc++.h>
using namespace std;
int main()
{

    for(int i=1;i<=4;i++)
    {
        int l,m,c_id,t_id;
        if(i==1)
        {
            l=2102001;
            m=2102010;
            c_id=2202;
            t_id=2001;
        }
        else if(i==2)
        {
            l=2202001,m=2202010,c_id=2102,t_id=2004;
        }
        else if(i==3)
        {
            l=2002001,m=2002010,c_id=2302,t_id=2007;
        }
        else
        {
            l=1902001,m=1902010,c_id=2402,t_id=2001;
        }
        for(int j=l;j<=m;j++)
        {
            int  c = c_id,t=t_id;
            cout<<"("<<j<<",  "<<t<<",  "<<c<<"),"<<endl;
            t++,c++;
            cout<<"("<<j<<",  "<<t<<",  "<<c<<"),"<<endl;
            t++,c++;
            cout<<"("<<j<<",  "<<t<<",  "<<c<<"),"<<endl;
            t++,c++;
        }
    }
}