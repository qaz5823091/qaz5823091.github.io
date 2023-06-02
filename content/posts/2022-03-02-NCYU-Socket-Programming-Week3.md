---
title: "[作業] 網路程式設計 Week 3"
date: 2022-03-02T11:50:13+08:00
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week3

### 簡介 Winsock
Winsock 故名思意是 Windows Socket，它提供了非常多功能還傳遞網路資訊。  
而 WSA 是 Windows Socket API 的縮寫。
在寫程式之前有裝了 MinGW（Minimalist GNU for Windows）[官方網站](https://www.mingw-w64.org/)，
安裝完後還要在自己的環境設定 Compiler。

### 第一題
* 使用 wireshark 分別抓 DNS query 與 response 封包

* DNS query
![demo](/images/network_programming_dns_query.png)

* DNS response（No such name）
![demo](/images/network_programming_dns_response.png)


### 第二題
* 印出 subnet 的所有 ip 其 domain name
    > **Note :** 注意 `inet_addr()` 裡的形態是 `C-String`

```cpp
#include <iostream>
#include <winsock.h>
#include <string>

using namespace std;

void printAddressContent(LPHOSTENT &pointer);

int main()
{
    WSADATA data;
    WSAStartup(0x101, (LPWSADATA) &data);

    LPHOSTENT  host_pointer;
    struct in_addr address;

    const string IP_PREFIX = "140.130.175.";
    string temp;
    for (int i=1;i<=255;i++) {
        temp = IP_PREFIX + to_string(i);
        cout << "------------------------" << endl;
        cout << temp << endl;
        address.s_addr = inet_addr(temp.c_str());
        host_pointer = gethostbyaddr((LPSTR) &address, sizeof(address), AF_INET);
        printAddressContent(host_pointer);
    }

    return 0;
}

void printAddressContent(LPHOSTENT &pointer) {
    if (pointer == nullptr) {
        cout << "Error: pointer is null." << endl;
        return ;
    }

    cout << "Name: " << pointer->h_name << endl;
    cout << "Aliases: " << pointer->h_aliases << endl;
    cout << "Length: " << pointer->h_length << endl;

    return ;
}
```

* 結果
![demo](/images/network_programming_gethostbyaddr.png)

## 本週心得
這次使用到很久沒碰的 C++ ，有些許陌生！
學到了一些 `winsock` 的 function，查詢了 `DNS`，也用 `wireshark` 截取封包資訊，好充實！
