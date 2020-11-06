---
title: "[C++] 期中考第三題"
date: 2020-11-06 14:07
categories: [jekyll]
tags: [C++]
---

### 期中考第三題：兌換瓶子

<br>
解題思路：<br>

* 每 `7` 個喝完的瓶子，可以再兌換一瓶
* `drink` 代表還沒喝的，`bottle` 代表喝完的瓶子
* 先把一開始的飲料都喝完
```c++
int bottle = drink;
```
* 如果一開始的飲料大於等於 `7` 瓶，就繼續兌換（`while` 迴圈）
* 每兌換一次就喝掉 `1` 瓶，兌換 `n` 次就喝掉 `n` 瓶
* 把上一次喝掉的瓶子跟不足兌換的瓶子收集起來，再拿去兌換
* 最後不夠兌換（瓶子`< 7`），就結束了（跳出 `while` 迴圈）
* 這時候的 `bottle` 就會是全部喝完的瓶子
* TCGS Judge 類似題目：[TCGS a041：收集冰棒棍](http://www.tcgs.tc.edu.tw:1218/ShowProblem?problemid=a041)

```c++
#include <iostream>
using namespace std;
int main()
{
    int drink;
    while(cin>>drink){
        int bottle = drink;
        while(drink >= 7){
            bottle += drink/7;
            drink = drink/7 + drink%7;
        }
        cout<<bottle<<endl;
    }
}
```
