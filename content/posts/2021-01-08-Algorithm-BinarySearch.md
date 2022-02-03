---
title: "[Algorithm] 二分搜尋法"
date: 2021-01-08T11:24:00+08:00
categories: [jekyll]
tags: [Algorithm,C++,NCYU]
---

<br><br>
### 二分搜尋法 Binary Search

搜尋是一種很經典的演算法，<br>
其中有一種搜尋法是將 `已排序` 的數列，<br>
藉由比大小將數列分成 `一半` 並 `縮小` 搜尋範圍。<br>
稱之為 「二分搜尋法」、「二元搜尋法」！<br>



```c++
#include <iostream>
#include <algorithm>

using namespace std;

void binarySearch(int *number, int wanted, int strat, int stop);

int main()
{
    int number[105];
    int n;

    while (cin>>n) {
        for (int i=0;i<n;i++)
            cin>>number[i];

        sort(number,number+n);

        int m, wanted;
        cin>>m;
        for (int i=0;i<m;i++) {
            cin>>wanted;
            binarySearch(number, wanted, 0, n-1);
            cout<<endl;
        }
    }
}

void binarySearch(int *number, int wanted, int start, int stop) {
    int next = (start + stop) / 2;

    if (start > stop) {
        cout<<"error";
        return ;
    }

    cout<<next<<" "<<number[next]<<" ";
    if (wanted > number[next])
        binarySearch(number, wanted, next+1, stop);
    else if (wanted == number[next])
        return ;
    else
        binarySearch(number, wanted, start, next-1);
}
```
