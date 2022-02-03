---
title: "[C++] 進制轉換"
date: 2020-11-04T21:12:00+08:00
categories: [jekyll]
tags: [C++]
---

可能是因為高中課業繁忙吧，當初覺得 `STL` 對我來說太多餘了，<br>
所以就沒興趣學了，也就放掉了。<br>
這次重拾 `STL` ，先從簡單的 `vector` 來練練手，<br>
並用進制轉換當做主題！<br>

※ `STL` 是 `Standrad Template Library` 的縮寫 <br>

---

十進位轉二進位：
* 以二進位定義計算
* 並將每次的結果插入 `vector` 的起點（後面解釋為什麼是 `insert` ）
* 傳入：整數（int）
* 回傳：陣列（vector）

```c++
vector<int> baseBinary(int number){
    vector<int> result;
    vector<int>::iterator it;
    while(number>0){
        it = result.begin();
        if (number%2==0)
            result.insert(it,0);
        else
            result.insert(it,1);
        number /= 2;
    }

    return result;
}
```

印出二進位：
* 因為二進位算完後，答案是結果往前推，所以用的是 `insert`
* 這樣一來陣列遍歷就從 `begin` 就好了
* `iterator` 有點像是 for `vector` 的 `指標` ，想要知道其中的值要 `取值 （*）`
* 傳入：陣列（vector）
* 回傳：無（void）

```c++
void print(vector<int> number){
    vector<int>::iterator it;
    for(it=number.begin();it!=number.end();it++)
        cout<<*it;
    cout<<endl;
}
```

二進位轉十進位：
* 每一位數字乘上想對應的值
* 傳入：陣列（vector）
* 回傳：整數（int）

```c++
int baseDecimal(vector<int> number){
    int result = 0;
    int length = number.size();
    for(int i=0;i<length;i++){
        result += number[i] * baseTwo[length-i-1];
    }
    return result;
}
```

宣告以二為基底的次方數值：
* 全域宣告以便 function 使用

```c++
vector<int> baseTwo = {1,2,4,8,16,32,64,128,256,512,1024,2048,4096};
```

完整程式碼：

```c++
#include <iostream>
#include <vector>
using namespace std;

vector<int> baseTwo = {1,2,4,8,16,32,64,128,256,512,1024,2048,4096};
vector<int> baseBinary(int number);
int baseDecimal(vector<int> number);
void print(vector<int> number);

int main()
{
    int number;
    cin>>number;
    vector<int> result;
    result = baseBinary(number);
    print(result);
    cout<<baseDecimal(result);

}

vector<int> baseBinary(int number){
    vector<int> result;
    vector<int>::iterator it;
    while(number>0){
        it = result.begin();
        if (number%2==0)
            result.insert(it,0);
        else
            result.insert(it,1);
        number /= 2;
    }

    return result;
}

int baseDecimal(vector<int> number){
    int result = 0;
    int length = number.size();
    for(int i=0;i<length;i++){
        result += number[i] * baseTwo[length-i-1];
    }
    return result;
}

void print(vector<int> number){
    vector<int>::iterator it;
    for(it=number.begin();it!=number.end();it++)
        cout<<*it;
    cout<<endl;
}
```
---
之後再將其他進制補上
