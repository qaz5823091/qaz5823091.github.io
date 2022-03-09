---
title: "[作業] 網路程式設計 Week 4"
date: 2022-03-09T11:43:04+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week4

### 第一題
![demo](/images/echo_server_process.png)
![demo](/images/echo_server_3way_handshake.png)
![demo](/images/echo_server_request.png)
![demo](/images/echo_server_response.png)
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
![demo](/images/simple_tcp_ip_service_7.png)
![demo](/images/simple_tcp_ip_service_9.png)
![demo](/images/simple_tcp_ip_service_13.png)
![demo](/images/simple_tcp_ip_service_17.png)
![demo](/images/simple_tcp_ip_service_19.png)
