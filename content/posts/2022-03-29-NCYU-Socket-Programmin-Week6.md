---
title: "[作業] 網路程式設計 Week 6"
date: 2022-03-29T18:52:36+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week5

### 第一題
* `socket` 跟 `sockaddr_int` 各開兩個，分別是 `chargen` 與 `discard`
* `server` 連線埠（`port`）不同
    ```c
    chargen_server.sin_port = htons(IPPORT_CHARGEN);
    discard_server.sin_port = htons(IPPORT_DISCARD);
    ```
    > **Note :** winsock 沒有定義 CHARGEN 的 port，所以就自己 define

* 程式碼
```c
#include <stdio.h>
#include <winsock.h>
#include <string>
#include <windows.h>

const char TARGET_IP[100] = "127.0.0.1\0";
const int IPPORT_CHARGEN = 19;
const int MAXIMUM_CHAR = 9999;

void showError(std::string message);

int main()
{
    WSADATA data;
    SOCKET chargen_socket, discard_socket;
    struct sockaddr_in chargen_server, discard_server;
    char reply[MAXIMUM_CHAR], temp[MAXIMUM_CHAR];
    int bytes = 0;

    if (WSAStartup(0x101, (LPWSADATA) &data) != 0) {
        showError("Error: can't use WinSock DLL\n");
    }

    chargen_socket = socket(AF_INET, SOCK_STREAM, 0);
    discard_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (chargen_socket == SOCKET_ERROR || discard_socket == SOCKET_ERROR) {
        showError("Error: can't open TCP socket\n");
    }

    chargen_server.sin_family = AF_INET;
    chargen_server.sin_addr.s_addr = inet_addr(TARGET_IP);
    chargen_server.sin_port = htons(IPPORT_CHARGEN);

    discard_server.sin_family = AF_INET;
    discard_server.sin_addr.s_addr = inet_addr(TARGET_IP);
    discard_server.sin_port = htons(IPPORT_DISCARD);

    /*
    if (bind(chargen_server, (LPSOCKADDR) &server, sizeof(server)) < 0) {
        showError("Error: can't bind local address\n");
    }

    if (listen(chargen_server, 1) < 0) {
        showError("Error: listen() is broken\n");
    }
    */

    if (connect(chargen_socket, (LPSOCKADDR) &chargen_server, sizeof(chargen_server)) < 0) {
        showError("Error: can't connect to chargen server\n");
    }
    if (connect(discard_socket, (LPSOCKADDR) &discard_server, sizeof(discard_server)) < 0) {
        showError("Error: can't connect to discard server\n");
    }

    while (1) {
        bytes = recv(chargen_socket, reply, MAXIMUM_CHAR, 0);
        Sleep(1000);
        printf("Send  : %s\n", reply);
        printf("Length: %d bytes\n", bytes);
        if (send(discard_socket, reply, strlen(reply) + 1, 0) == SOCKET_ERROR) {
            showError("Error: send() is broken\n");
        }
    }

    closesocket(chargen_socket);
    closesocket(discard_socket);
    WSACleanup();

    return 0;
}

void showError(std::string message) {
    fprintf(stderr, message.c_str());
    exit(1);
}
```

* 有一點不太懂，從 chargen 抓下來的東西大小，一定是自定義的大小（`MAXIMUM_CHAR`），
那要如何抓每秒的封包大小呢？google 下來的答案好像都是要配合 `select` 指令或是使用 `multi-thread` 去抓一秒的資料。

### 第二題

* `socket` 與 `socketaddr_in` 各開三個：`proxy_server`、`server` 與 `client`
* 取得 `DNS name` 在之前的[練習](../2022-03-02-NCYU-Socket-Programming-Week3)有做過了
* 想法
    - 有關使用者的都透過 `client` 來操作
        - 使用者輸入
        - 回傳時間、DNS name

    - 需要使用 Simple TCP/IP 服務則透過 `server`
    - 使用者使用我們寫的服務，需連上我們寫的 server ，所以是透過 `proxy_server`

* 程式碼
```c
#include <stdio.h>
#include <winsock.h>
#include <string>

const char TARGET_IP[] = "127.0.0.1";
const int TARGET_PORT = 7777;
const int MAXIMUM_CHAR = 100;
const char COMMAND_TIME[] = "time";
const char COMMAND_ASK[] = "ask://";

void showError(std::string message);

int main()
{
    WSADATA data;
    SOCKET client_socket, server_socket, proxy_socket;
    struct sockaddr_in proxy_server, server, client;
    struct in_addr address;
    LPHOSTENT  host_pointer;
    int client_size, receive_result;
    char temp_char[MAXIMUM_CHAR], command[MAXIMUM_CHAR], reply[MAXIMUM_CHAR], temp_ip[MAXIMUM_CHAR];

    if (WSAStartup(0x101, (LPWSADATA) &data) != 0) {
        showError("Error: can't use WinSock DLL\n");
        exit(1);
    }

    client_socket = socket(AF_INET, SOCK_STREAM, 0);
    server_socket = socket(AF_INET, SOCK_STREAM, 0);
    proxy_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (client_socket == SOCKET_ERROR || server_socket == SOCKET_ERROR || proxy_socket == SOCKET_ERROR) {
        showError("Error: can't open TCP connection\n");
        exit(1);
    }

    proxy_server.sin_family = AF_INET;
    proxy_server.sin_addr.s_addr = inet_addr(TARGET_IP);
    proxy_server.sin_port = htons(TARGET_PORT);

    if (bind(proxy_socket, (LPSOCKADDR) &proxy_server, sizeof(proxy_server)) < 0) {
        showError("Error: bind() is broken\n");
        exit(1);
    }

    if (listen(proxy_socket, 5) < 0) {
        showError("Error: listen() is broken\n");
        exit(1);
    }

    while (1) {
        printf("Proxy server waits...\n");
        client_size = sizeof(client);
        client_socket = accept(proxy_socket, (struct sockaddr *) &client, &client_size);
        while (1) {
            if (receive_result = recv(client_socket, temp_char, MAXIMUM_CHAR, 0) == 0) {
                showError("Error: connection is closed\n");
                break;
            }
            else if (receive_result == SOCKET_ERROR) {
                showError("Error: recv() is broken");
                break;
            }
            temp_char[1] = '\0';
            printf("%s", temp_char);

            if (temp_char[0] != '\r') {
                strcat(command, temp_char);
                continue;
            }
            command[strlen(command) + 1] = '\0';

            if (strcmp(command, COMMAND_TIME) == 0) {
                server.sin_family = AF_INET;
                server.sin_addr.s_addr = inet_addr(TARGET_IP);
                server.sin_port = htons(IPPORT_DAYTIME);
                if (connect(server_socket, (LPSOCKADDR) &server, sizeof(server)) == SOCKET_ERROR) {
                    showError("Error: can't connect to chargen server\n");
                    break;
                }
                recv(server_socket, reply, MAXIMUM_CHAR, 0);
                send(client_socket, reply, strlen(reply) + 1, 0);
                closesocket(server_socket);
                command[0] = '\0';
                break;
            }
            else if (strcmp(command, COMMAND_ASK) > 0) {
                strncpy(temp_ip, command + 6, strlen(command));
                printf("\n%s\n", temp_ip);
                address.s_addr = inet_addr(temp_ip);
                host_pointer = gethostbyaddr((LPSTR) &address, sizeof(address), AF_INET);
                send(client_socket, host_pointer->h_name, strlen(host_pointer->h_name) + 1, 0);
                command[0] = '\0';
                break;
            }
            else {
                printf("Type error!\n");
                break;
            }
        }
        closesocket(client_socket);
    }
    closesocket(proxy_socket);
    WSACleanup();

    return 0;
}

void showError(std::string message) {
    fprintf(stderr, message.c_str());

    return ;
}
```
* 執行結果：
![demo](/images/proxy_server_time.png)
![demo](/images/proxy_server_ask.png)
![demo](/images/proxy_server_ask_result.png)

* C 語言對於字串處理真的好麻煩...

### 本週心得
這次程式難了許多，需要構想各個角色的職責，才能寫好程式！
