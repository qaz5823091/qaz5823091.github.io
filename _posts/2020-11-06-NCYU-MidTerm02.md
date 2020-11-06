---
title: "[C++] 期中考第二題"
date: 2020-11-06 12:40
categories: [jekyll]
tags: [C++]
---

# 期中考第二題

提款卡密碼：<br>
* `a b c d . . .` 照順序排序，計算他們相間的距離
* 將上述做法具現化，可以利用 `ASCII`
* 將兩字元的 `ASCII` 相減，就是他們之間的距離
* 因為差有可能為負，且距離不為負，所以加上 `<cmath>` 的 `abs()` 絕對值
* 超過 `9` 之後，則取個位數字，可以利用 `%` 來實現
* `ASCII` 欲做運算需將它轉形態（`cast`），所以利用 `int` 轉為整數形態
* `for` 迴圈遍歷 `word` 中每一個字元，且索引 `i` 與 `i+1` 的值
* 注意上述做法 `i` 會跑到 `< length-1`
* ZeroJudge 類似題目：[Zerojudge a065：提款卡密碼](https://zerojudge.tw/ShowProblem?problemid=a065)


參考程式碼：

```c++
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    string word;
    cin>>word;
    int length = word.size();
    for(int i=0;i<length-1;i++){
        cout<<int ( abs(word[i+1]-word[i]) ) % 10;
    }
    cout<<endl;
}
```
