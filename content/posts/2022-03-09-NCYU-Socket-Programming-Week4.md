---
title: "[作業] 網路程式設計 Week 4"
date: 2022-03-09T11:43:04+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week4

### 簡介 Simple TCP/IP Services
簡單 TCP/IP 服務是用來測試的服務，總共有五個：
* Echo      - port 7
    - 就像 echo 的意思，打什麼就會回應什麼
* Discard   - port 9
    - 打什麼都不會回應
* Daytime   - port 13
    - 報時
* Quote      - port 17
    - 每日一語錄
* CHARGEN   - port 19
    - 字元產生器，不跳脫的話不會停止

> **Note :** 簡單 TCP/IP 服務是 Windows 選用的功能，需手動開啟，請 [參考](https://blog.miniasp.com/post/2011/11/30/Simple-TCP-IP-Services-for-Socket-Development)。

### 第一題
* 打開 windows terminal ( or cmd )，並連線 Echo Server
```console
$ telnet localhost 7
```

* 輸入 `abc`，並用 `Ctrl + ]` 跳脫
    > **Note :** 有些電腦輸入上述快捷鍵會變成 `全形括號` ，是因為微軟注音的關係。下載英文語言輸入法，切換成英文鍵盤，就解決囉！

* 關閉連線並退出
```console
Windows Telnet > close
```
```console
Windows Telnet > q
```

* 觀察封包
    - 建立連線、傳遞訊息、接收訊息、結束連線
    ![demo](/images/echo_server_process.png)
    - 建立 TCP 連線（三方交握）
    ![demo](/images/echo_server_3way_handshake.png)
    - 傳遞訊息（Echo data 為 63 是 ASCII 值，代表 `c`）
    ![demo](/images/echo_server_request.png)
    - 接收訊息（觀察 `Src Port` 與 `Dst Port` 的關係，可看出是傳遞還是接收）
    ![demo](/images/echo_server_response.png)
    - 結束連線
    ![demo](/images/echo_server_end.png)

### 第二題
```cpp
#include <iostream>
#include <string.h>
#include <winsock.h>

#define MAXIMUM_CHAR 1024

using namespace std;

void printMenu();
int main()
{
    WSADATA data;
    SOCKET sock;
    struct sockaddr_in service;
    char message[1024];
    char reply[1024];
    int option, port, bytes = 0;

    WSAStartup(0x101, (LPWSADATA) &data);
    sock = socket(AF_INET, SOCK_STREAM, 0);

    service.sin_family = AF_INET;
    service.sin_addr.s_addr = inet_addr("127.0.0.1");

    printMenu();
    cin >> option;
    switch (option) {
        case 1:
            port = 7;
            break;
        case 2:
            port = 9;
            break;
        case 3:
            port = 13;
            break;
        case 4:
            port = 17;
            break;
        case 5:
            port = 19;
            break;
        default:
            port = -1;
            break;
    }

    if (port == -1) {
        return 0;
    }

    service.sin_port = htons(port);
    connect(sock, (LPSOCKADDR) &service, sizeof(service));
    if (port == 7 || port == 9) {
        strcpy(message, "I love NCYU CSIE");
        send(sock, message, strlen(message) + 1, 0);
    }
    if (port != 9) {
        bytes = recv(sock, reply, MAXIMUM_CHAR, 0);
    }
    closesocket(sock);

    cout << "| 執行結果 |" << endl;
    if (port == 7 || port == 9) {
        cout << "傳送內容：" << message << endl;
        cout << "傳送長度：" << strlen(message) + 1 << " bytes" << endl;
    }
    cout << "回應內容：" << reply << endl;
    cout << "回應長度：" << strlen(reply) + 1 << " bytes" << endl;

    WSACleanup();
    system("pause");

    return 0;

}

void printMenu() {
    cout << "___________________________________" << endl;
    cout << "|請輸入服務代碼以執行服務（1 ~ 5）|" << endl;
    cout << "|1 > 回應服務          （Echo）   |" << endl;
    cout << "|2 > 丟棄服務          （Discard）|" << endl;
    cout << "|3 > 時間日期服務      （Daytime）|" << endl;
    cout << "|4 > 每日一句          （Quote）  |" << endl;
    cout << "|5 > 字元產生器        （Chargen）|" << endl;
    cout << "|6 > 離開              （Exit）   |" << endl;
    cout << "-----------------------------------" << endl;
    cout << "Type > ";

    return ;
}
```
> **Note :** 只有 echo 跟 discard 需要傳遞訊息，其餘不用，而且 discard 不用回收訊息。


* 執行結果
    - Echo 結果應跟傳遞訊息一樣
    ![demo](/images/simple_tcp_ip_service_7.png)
    - Discard 不會有任何回覆訊息
    ![demo](/images/simple_tcp_ip_service_9.png)
    - 就是報時
    ![demo](/images/simple_tcp_ip_service_13.png)
    - 每日一句
    ![demo](/images/simple_tcp_ip_service_17.png)
    - 字元產生（有限制長度 `1024 bytes`）
    ![demo](/images/simple_tcp_ip_service_19.png)

### 本週心得
因為 `winsock` 是很早期用 `C LANG` 開發的，很多東西都要用到 C，例如訊息的傳遞就是用 `Char Array`，
如果是用 `C++` 寫的話，就要透過其他函式來變成 `String`，下次試著用 C 來寫作業好了！
