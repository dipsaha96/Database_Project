// #include <bits/stdc++.h>
// using namespace std;
// int main()
// {
//     for (int i = 1; i <= 4; i++)
//     {
//         int l,m,c_id,as,pr,ct,tf,as1m,as2m,prm,ct1m,ct2m,tfm,ta;
//         if(i==1)
//         {
//             l=2102001;
//             m=2102010;
//             c_id=2202;
//         }
//         else if(i==2)
//         {
//             l=2202001,m=2202010,c_id=2102;
//         }
//         else if(i==3)
//         {
//             l=2002001,m=2002010,c_id=2302;
//         }
//         else
//         {
//             l=1902001,m=1902010,c_id=2402;
//         }

//         for (int j = l; j <= m; j++)
//         {
//             int  c = c_id;
//             cout << "(" << j << ", "  << c << ", " <<c*100+1<<", "<<c*100+2<<", "<<c*100+21<<", "<<c*100+11<<", "<<c*100+12<<", "<<c*100+51
//             <<", "<<rand()%5+6<<", "<<rand()%5+6<<", "<<rand()%11+40<<", "<<rand()%11+10<<", "<<
//             rand()%6+15<<", "<<rand()%40+61<<", "<<rand()%3+8<<"),"<<endl;

//             cout << "(" << j << ", "  << c+1 << ", " <<c*100+101<<", "<<c*100+102<<", "<<c*100+121<<", "<<c*100+111<<", "<<c*100+112<<", "<<c*100+151
//             <<", "<<rand()%5+6<<", "<<rand()%5+6<<", "<<rand()%11+40<<", "<<rand()%11+10<<", "<<
//             rand()%6+15<<", "<<rand()%40+61<<", "<<rand()%3+8<<"),"<<endl;

//              cout << "(" << j << ", "  << c+2 << ", " <<c*100+201<<", "<<c*100+202<<", "<<c*100+221<<", "<<c*100+211<<", "<<c*100+212<<", "<<c*100+251
//             <<", "<<rand()%5+6<<", "<<rand()%5+6<<", "<<rand()%11+40<<", "<<rand()%11+10<<", "<<
//             rand()%6+15<<", "<<rand()%40+61<<", "<<rand()%3+8<<"),"<<endl;
            
//         }
//     }
// }

#include <bits/stdc++.h>
using namespace std;
int main()
{
    int c=1101;
    int t=1001;
    for(int i=1;i<=8;i++)
    {
    for (int i = 1; i <= 4; i++)
    {
        if(i ==3) t-=10;
            cout << "(" << c << ", " <<c*100+1<<", "<<c*100+2<<", "<<c*100+21<<", "<<c*100+11<<", "<<c*100+12<<", "<<c*100+51<<", "<<
            t<<"),"<<endl;

            cout << "(" << c+1 << ", " <<c*100+101<<", "<<c*100+102<<", "<<c*100+121<<", "<<c*100+111<<", "<<c*100+112<<", "<<c*100+151<<", "<<
            t+1<<"),"<<endl;

             cout << "(" << c+2 << ", " <<c*100+201<<", "<<c*100+202<<", "<<c*100+221<<", "<<c*100+211<<", "<<c*100+212<<", "<<c*100+251<<", "<<
            t+2<<"),"<<endl;

            cout << "(" << c+3 << ", " <<c*100+301<<", "<<c*100+302<<", "<<c*100+321<<", "<<c*100+311<<", "<<c*100+312<<", "<<c*100+351<<", "<<
            t+3<<"),"<<endl;

            cout << "(" << c+4 << ", " <<c*100+401<<", "<<c*100+402<<", "<<c*100+421<<", "<<c*100+411<<", "<<c*100+412<<", "<<c*100+451<<", "<<
            t+4<<"),"<<endl;

            c=c+100;
            t+=5;
            
        }

        c+=600;
        t+=990;
    }


}
