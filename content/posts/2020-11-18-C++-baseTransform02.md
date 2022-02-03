---
title: "[C++] 進制轉換 Part 2"
date: 2020-11-18T19:01:00+08:00
categories: [jekyll]
tags: [C++]
---

這次是把 etutor 的作業做延伸，<br>
並且用 `STL` 中的 `map` 實作！<br>

上一次是用 `vector` 來實作<br>
延伸閱讀：[C++ 進制轉換](../C++-baseTransform) <br>

#### map
* `map` 的概念就是 `映射`
* 由數個數對構成
* 數對是以 `key : value` 的形式存在
* 任一 `key` 可對到其 `value`
* 同一個 `key` 不會有不同 `value` ，像是 `函數` 定義

※ 因為程式碼有高度重複性，所以就貼一部分而已 <br>

程式碼大概如下：<br>
* 使用 `map` 建表
```c++
map<string, string> dicHex = {
    {"0", "0000"},
    {"1", "0001"},
    {"2", "0010"},
    {"3", "0011"},
    {"4", "0100"},
    {"5", "0101"},
    {"6", "0110"},
    {"7", "0111"},
    {"8", "1000"},
    {"9", "1001"},
    {"a", "1010"},
    {"b", "1011"},
    {"c", "1100"},
    {"d", "1101"},
    {"e", "1110"},
    {"f", "1111"},
    {"A", "1010"},
    {"B", "1011"},
    {"C", "1100"},
    {"D", "1101"},
    {"E", "1110"},
    {"F", "1111"},
    {"0000", "0"},
    {"0001", "1"},
    {"0010", "2"},
    {"0011", "3"},
    {"0100", "4"},
    {"0101", "5"},
    {"0110", "6"},
    {"0111", "7"},
    {"1000", "8"},
    {"1001", "9"},
    {"1010", "a"},
    {"1011", "b"},
    {"1100", "c"},
    {"1101", "d"},
    {"1110", "e"},
    {"1111", "f"}
};
```

* 確認數字是否為有效的 （有 `checkBin` 、 `checkOct` 、 `checkHex`）
```c++
bool checkBin(string number) {
    int length = number.size();
    for (int i=0;i<length;i++) {
        if ( !(number[i] == '0' || number[i] == '1') ) {
            return false;
        }
    }

    return true;
}
```

* 初始化數字
```c++
void initialize(string &number, int base) {
    while( number.size() % base != 0) {
        number = "0" + number;
    }

    return ;
}
```

* 二進位轉八進位
```c++
string binToOct(string number) {
    bool isBin = checkBin(number);
    const int SIZE = 3;
    string result;

    if ( isBin ) {
        initialize(number,SIZE);
        int times = number.size() / SIZE;
        for (int i=0;i<times;i++) {
            string digit = number.substr(i*SIZE,SIZE);
            result += dicOct[ digit ];
        }

        return result;
    }
    else
        return "Error";
}
```

* 八進位轉二進位
```c++
string octToBin(string number) {
    bool isOct = checkOct(number);
    string result, digit;

    if ( isOct ) {
        for (int i=0;i<number.size();i++) {
            digit = number[i];
            result += dicOct[ digit ];
        }
        deleteZero(result);
        return result;
    }
    else
        return "Error";
}
```

* 刪除因運算而產生的零
```c++
void deleteZero(string &number) {
     while (number[0] != '1') {
        number.erase(0,1);
     }

     return ;
}
```

<br>
完整程式碼：<br>
```c++
#include <iostream>
#include <map>
using namespace std;

// use C++11 to initialize the map
map<string, string> dicOct = {
    {"0", "000"},
    {"1", "001"},
    {"2", "010"},
    {"3", "011"},
    {"4", "100"},
    {"5", "101"},
    {"6", "110"},
    {"7", "111"},
    {"000", "0"},
    {"001", "1"},
    {"010", "2"},
    {"011", "3"},
    {"100", "4"},
    {"101", "5"},
    {"110", "6"},
    {"111", "7"}
};

map<string, string> dicHex = {
    {"0", "0000"},
    {"1", "0001"},
    {"2", "0010"},
    {"3", "0011"},
    {"4", "0100"},
    {"5", "0101"},
    {"6", "0110"},
    {"7", "0111"},
    {"8", "1000"},
    {"9", "1001"},
    {"a", "1010"},
    {"b", "1011"},
    {"c", "1100"},
    {"d", "1101"},
    {"e", "1110"},
    {"f", "1111"},
    {"A", "1010"},
    {"B", "1011"},
    {"C", "1100"},
    {"D", "1101"},
    {"E", "1110"},
    {"F", "1111"},
    {"0000", "0"},
    {"0001", "1"},
    {"0010", "2"},
    {"0011", "3"},
    {"0100", "4"},
    {"0101", "5"},
    {"0110", "6"},
    {"0111", "7"},
    {"1000", "8"},
    {"1001", "9"},
    {"1010", "a"},
    {"1011", "b"},
    {"1100", "c"},
    {"1101", "d"},
    {"1110", "e"},
    {"1111", "f"}
};

bool checkBin(string );
bool checkOct(string );
bool checkHex(string );
void initialize(string &number, int base);
string binToOct(string number);
string binToHex(string number);
string hexToBin(string number);
string octToBin(string number);
void deleteZero(string &number);

int main()
{
    string number = "110101110101101011101111110101110101";
    number = binToHex(number);
    cout<<number<<endl;

}

bool checkBin(string number) {
    int length = number.size();
    for (int i=0;i<length;i++) {
        if ( !(number[i] == '0' || number[i] == '1') ) {
            return false;
        }
    }

    return true;
}

bool checkOct(string number) {
    int length = number.size();
    for (int i=0;i<length;i++) {
        if ( !(number[i] >= '0' && number[i] <= '7') ){
            return false;
        }
    }

    return true;
}

bool checkHex(string number) {
    int length = number.size();
    for (int i=0;i<length;i++) {
        if ( !( (number[i] >= '0' && number[i] <= '9') || (number[i] >= 'a' && number[i] <= 'f') ) ){
            return false;
        }
    }

    return true;
}

void initialize(string &number, int base) {
    while( number.size() % base != 0) {
        number = "0" + number;
    }

    return ;
}

string binToOct(string number) {
    bool isBin = checkBin(number);
    const int SIZE = 3;
    string result;

    if ( isBin ) {
        initialize(number,SIZE);
        int times = number.size() / SIZE;
        for (int i=0;i<times;i++) {
            string digit = number.substr(i*SIZE,SIZE);
            result += dicOct[ digit ];
        }

        return result;
    }
    else
        return "Error";
}

string binToHex(string number) {
    bool isBin = checkBin(number);
    const int SIZE = 4;
    string result;

    if ( isBin ) {
        initialize(number,4);
        int times = number.size() / SIZE;
        for (int i=0;i<times;i++) {
            string digit = number.substr(i*SIZE,SIZE);
            result += dicHex[ digit ];
        }

        return result;
    }
    else
        return "Error";
}

string octToBin(string number) {
    bool isOct = checkOct(number);
    string result, digit;

    if ( isOct ) {
        for (int i=0;i<number.size();i++) {
            digit = number[i];
            result += dicOct[ digit ];
        }
        deleteZero(result);
        return result;
    }
    else
        return "Error";
}

string hexToBin(string number) {
    bool isHex = checkHex(number);
    string result, digit;

    if ( isHex ) {
        for (int i=0;i<number.size();i++) {
            digit = number[i];
            result += dicHex[ digit ];
        }
        deleteZero(result);
        return result;
    }
    else
        return "Error";
}

void deleteZero(string &number) {
     while (number[0] != '1') {
        number.erase(0,1);
     }

     return ;
}
```

---
十轉二快生出來了
