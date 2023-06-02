---
title: "[作業] 網路程式設計 Week 7"
date: 2022-04-04T01:10:14+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week7
* 先說 C 的 string 真的好煩🤬🤬🤬🤬🤬🤬🤬🤬
* 分三個角色 `Server`、`Viewer` 跟很多 `Clients`
* 要先開 `Server` 的程式，再開 `Viewer`，最後是隨便你要幾個 `Client`
* 名字從 `Client` 記錄
* `Server` 一直接收訊息，再送去 `Viewer`
* 執行結果
![demo](/images/chat_room_result.png)

* 程式碼
    - Server
    ```c
    #include <stdio.h>
    #include <winsock.h>

    #define TARGET_IP "127.0.0.1"
    #define TARGET_PORT 7777
    #define MAXIMUM_CHAR 1024
    #define CLIENT_NUM 2

    int main()
    {
        SOCKET server_socket, viewer_socket, client_socket;
        WSADATA data;
        struct sockaddr_in server, viewer, client;

        char message[MAXIMUM_CHAR], temp[MAXIMUM_CHAR];;
        int result, viewer_length, client_length;

        WSAStartup(0x101, &data);
        server_socket = socket(AF_INET, SOCK_STREAM, 0);
        server.sin_family = AF_INET;
        server.sin_port = htons(TARGET_PORT);
        server.sin_addr.s_addr = inet_addr(TARGET_IP);

        bind(server_socket, (struct sockaddr *) &server, sizeof(server));

        listen(server_socket, 5);

        printf("[Server]\n");
        printf("Wait viewer connecting...\n");
        viewer_length = sizeof(viewer);
        viewer_socket = accept(server_socket, (struct sockaddr *) &viewer, &viewer_length);


        printf("Server waits...\n");
        client_length = sizeof(client);
        while (1) {
            memset(message, 0, MAXIMUM_CHAR);
            client_socket = accept(server_socket, (struct sockaddr *) &client, &client_length);
            result = recv(client_socket, message, MAXIMUM_CHAR, 0);
            printf("Receive: %s\n", message);
            if (result <= 0) {
                break;
            }
            closesocket(client_socket);
            send(viewer_socket, message, strlen(message) + 1, 0);
        }
        closesocket(client_socket);
        closesocket(viewer_socket);
        closesocket(server_socket);

        WSACleanup();

        return 0;
    }
    ```
    - Viewer
    ```c
    #include <stdio.h>
    #include <winsock.h>

    #define TARGET_IP "127.0.0.1"
    #define TARGET_PORT 7777
    #define MAXIMUM_CHAR 1024

    int main()
    {
        SOCKET server_socket;
        struct sockaddr_in server;
        WSADATA data;
        char message[MAXIMUM_CHAR];
        int result;

        WSAStartup(0x101, &data);
        server_socket = socket(AF_INET, SOCK_STREAM, 0);
        server.sin_family = AF_INET;
        server.sin_addr.s_addr = inet_addr(TARGET_IP);
        server.sin_port = htons(TARGET_PORT);

        printf("[Viewer]\n");
        printf("Connect to server...\n");
        connect(server_socket, (struct sockaddr *) &server, sizeof(server));

        while (1) {
            memset(message, 0, MAXIMUM_CHAR);
            result = recv(server_socket, message, MAXIMUM_CHAR, 0);
            if (result <= 0) {
                break;
            }
            printf("%s\n", message);
        }
        closesocket(server_socket);
        WSACleanup();

        return 0;
    }
    ```
    - Client
    ```c
    #include <stdio.h>
    #include <winsock.h>

    #define TARGET_IP "127.0.0.1"
    #define TARGET_PORT 7777
    #define MAXIMUM_CHAR 1024

    int main()
    {
        SOCKET server_socket;
        WSADATA data;
        struct sockaddr_in server;

        char name[MAXIMUM_CHAR], message[MAXIMUM_CHAR], temp[MAXIMUM_CHAR];;

        WSAStartup(0x101, &data);
        server.sin_family = AF_INET;
        server.sin_addr.s_addr = inet_addr(TARGET_IP);
        server.sin_port = htons(TARGET_PORT);


        printf("[Client]\n");
        printf("Your name: ");
        gets(name);
        name[strlen(name)] = ':';
        while (1) {
            server_socket = socket(AF_INET, SOCK_STREAM, 0);
            memset(temp, 0, MAXIMUM_CHAR);
            memset(message, 0, MAXIMUM_CHAR);
            printf("Input: ");
            gets(message);
            printf("Send: %s\n", message);
            strcpy(temp, name);
            strcat(temp, message);
            strcpy(message, temp);
            connect(server_socket, (struct sockaddr *) &server, sizeof(server));
            send(server_socket, message, strlen(message) + 1, 0);
            closesocket(server_socket);
        }
        WSACleanup();

        return 0;
    }
    ```

### 本週心得
還沒看老師影片跟 code 前，就在想要怎麼兜，訊息要怎麼不輪流傳，後來看老師的 code，就明瞭了！
還有 C string 真的是很🤬（字被 ban 掉了），本來想做 ban words 跟 bye，但算了...
