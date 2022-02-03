---
title: "[C++] 期中考詳細參考答案"
date: 2020-12-07T22:45:00+08:00
categories: [jekyll]
tags: [C++,NCYU]
---
<br>
### 第一題：老師的災難

<br>
這題只有函式部分
* 使用 `getline` 讀每一行學生的答案
* 如果回覆為 `.` 則結束閱讀試卷 （ `break` ）
* 如果回覆為 ` ` 則加為作答分數 ( `unansweredScore` )
* 如果回覆和答案一樣加對的分數 （ `rightScore` ）
* 否則就是錯的，加錯的分數 （ `wrongScore` ）
* 超過 100 分為 100 分；小於 0 分為 0 分
* 最後回傳分數
```c++
return score;
```

參考程式碼如下：

```c++
int caluScore(string &answer, int rightScore, int unansweredScore, int wrongScore) {
    string reply;
    getline(cin,reply);

    int score = 0;
    int length = reply.size();
    for (int i=0;i<length;i++) {
        if (reply[i] == '.')
            break;
        if (reply[i] == ' ')
            score += unansweredScore;
        else if (reply[i] == answer[i])
            score += rightScore;
        // means wrong
        else
            score += wrongScore;
    }

    if (score>100)
        score = 100;
    if (score<0)
        score = 0;

    return score;
}
```
~~ps 不太懂為什麼題目要傳參 `&answer`~~

<br>
### 第二題：專業測試員

<br>
* 主要分為五大功能，其中一個功能題目沒要求
* 為了方便函式使用電燈的陣列，將它宣告在全域 （ `light` ）
* `light` 的 `index` 從 `1` 開始操作，方便跟編號做對應，<br>
  所以陣列有多宣告幾位，因為怕 `overflow`
* 初始化電燈 （ `setUp` ）
```c++
void setUp(int sizeOfLight) {
    for (int i=1;i<=sizeOfLight;i++)
        light[i] = 'G';

    return ;
}
```
* 所有的燈號做一次的切換 ( `setAll` )
```c++
void setAll(int sizeOfLight) {
    for (int i=1;i<=sizeOfLight;i++) {
        switch (light[i]) {
            case 'G':
                light[i] = 'Y';
                break;
            case 'Y':
                light[i] = 'R';
                break;
            case 'R':
                light[i] = 'G';
                break;
            // means Error
            default:
                light[i] = 'E';
                break;
        }
    }

    return ;
}
```
* 改變指定電燈 （ `changeLight` ）
```c++
string changeLight(int index, char color) {
    if (color == light[index])
        return "wrong";

    light[index] = color;
    return "ok";
}
```
* 查詢電燈 （ `searchLight` ）
```c++
char searchLight(int index) {
    return light[index];
}
```
* 更改指定顏色的電燈 （ `DIYLight` ）
```c++
void DIYLight(char firstColor, char secondColor, int sizeOfLight) {
    for (int i=1;i<=sizeOfLight;i++) {
        if (light[i] == firstColor)
            light[i] = secondColor;
    }

    return ;
}
```
* 主程式 （ `main` ）
```c++
int main()
{
    int sizeOfLight;
    cin>>sizeOfLight;
    setUp(sizeOfLight);

    int index;
    char command, color;
    while (cin>>command) {
        if (command == 'A') {
            setAll(sizeOfLight);
        }
        else if (command == 'C') {
            cin>>index>>color;
            string status = changeLight(index,color);
            if (status == "wrong")
                cout<<status<<endl;
        }
        else if (command == 'S') {
            cin>>index;
            color = searchLight(index);
            cout<<color<<endl;
        }
        else if (command == 'X') {
            char firstColor, secondColor;
            cin>>firstColor>>secondColor;
            DIYLight(firstColor,secondColor,sizeOfLight);
        }
        // means Error
        else {
            cout<<"Error"<<endl;
        }
    }
}
```

* Q：有些地方題目沒有要求要寫出來 （ 例如 `Error` ），<br>
  但為什麼會那樣寫？<br>
* A：因為方便 `debug`

<br>
### 第三題：大城市尋寶

<br>
* 利用一個陣列記錄寶藏所在地 ( `treasure` )
* start 記錄每一次的起點
* n 個寶藏要找 n-1 次 （ 起點不算 ）
* 每一次都找距離起點最近的，並將距離跟座標記下來
* 將找過的點座標記成 `1001` （ 題目 `-500 < x < 500` ）
* 跑完一次迴圈再把距離加上去以及更改起點

參考程式碼如下：
```c++
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    int times;
    while (cin>>times) {
        int treasure[50] = {0};

        if (times == 0)
            break;

        for (int i=0;i<times;i++)
            cin>>treasure[i];

        int start = treasure[0];
        int distance = 0;
        for (int i=1;i<times;i++) {
            int distanceMin = 1001;
            int index;
            for (int j=1;j<times;j++) {
                if (treasure[j] == 1001)
                    continue;

                if (abs(start - treasure[j]) < distanceMin) {
                    distanceMin = abs(start - treasure[j]);
                    index = j;
                }
            }
            distance += distanceMin;
            start = treasure[index];
            treasure[index] = 1001;
        }
        cout<<distance<<endl;
    }
}
```
### 第四題：密室大逃脫

<br>
* 注意題目的資料上限 （ `long long` ）
* 很重要的一點：認識 `^` （ `XOR 運算子` ）
* 6 ^ 10 = 12 （ 兩數字轉成二進位再做 `XOR` 運算 ）
```c++
  0110 ->  6
  1010 -> 10
  1100 -> 12
```
* 簡化題目後，就是把兩數字做完 `XOR` 運算，再把它轉成二進位
* 總長五十，不足要補零


參考程式碼如下：
```c++
#include <iostream>
using namespace std;

void binary(long long int number);

int main()
{
    long long int a,b;
    while (cin>>a>>b) {
        if (a == 0 && b == 0)
            break;
        binary(a^b);
    }
}

void binary(long long int number) {
    string result;
    while (number > 0) {
        result += char(number % 2 + '0');
        number /= 2;
    }

    int length = result.size();
    for (int i=49;i>=0;i--) {
        if (i>=length)
            cout<<"0";
        else
            cout<<result[i];
    }
    cout<<endl;
}
```

<br>
### 第五題：大樹與精靈

<br>
* 前十年，精靈都沒有成長
* 第十一年，第一隻精靈成長兩倍；第十五年，前五隻精靈成長兩倍<br>
  （ `11 -> 10 + 1*2` , `15 -> 10 + 5*2` ）
* 第二十年，前十隻成長兩倍；第三十年，前十隻成長四倍，再來十隻成長兩倍<br>
  （ `20 -> 10*2 + 10` , `30 -> 10*4 + 10*2 + 10` ）
* 94 數學問題 ~

參考程式碼如下：
```c++
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    long long int year;
    while (cin>>year) {
        if (year == -1)
            break;

        if (year < 10)
            cout<<year<<endl;
        else {
            long long int sum = 0;
            int exponent = 0;
            while (year > 10) {
                sum += 10 * pow(2,exponent);
                year -= 10;
                exponent++;
            }
            sum += year * pow(2,exponent);
            cout<<sum<<endl;
        }
    }
}
```

---

有任何問題，歡迎私訊喔！
