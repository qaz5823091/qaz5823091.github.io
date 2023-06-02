---
title: "[作業] 網路程式設計 Week 5"
date: 2022-03-22T22:47:12+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week5

### 簡介程式碼

* `WSADATA` 為操控 Windows Socket API
    - set up WSA 的 data
    ```c
    WSAStartup(0x101, &data);
    ```

    - 清除 data
    ```c
	WSACleanup();
    ```

* `socketaddr_in` 分成兩種：`server`、`client`
    - 設定 server 屬性
    ```c
    server.sin_family = AF_INET;
    server.sin_port = htons(1234);
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    ```
    > **Note :** 使用 IPv4 連接 localhost:1234

    - 將 server 屬性與 socket 綁定
    ```c
    bind(server_socket, (struct sockaddr *) &server, sizeof(server));
    ```

* `socket` 分成兩種：`server_socket`、`client_socket`
    - 建立 server 的 socket
    ```c
	server_socket = socket(AF_INET, SOCK_STREAM, 0);
    ```

    - 接受 client 的 socket 之前，規定排隊人數
    ```c
    listen(server_socket,5);
    ```

    - 接收 client 的 socket
    ```c
    client_socket =  accept(server_socket, (struct sockaddr *)  &client, &client_size);
    ```

    - 接收 client 傳來的訊息
    ```c
    recv(client_socket, str, 100, 0);
    ```

    - server 傳訊息給 client
    ```c
    send(client_socket, str, strlen(str) + 1, 0);
    ```

    - 結束連線要關閉 socket
    ```c
    closesocket(client_socket);
    closesocket(server_socket);
    ```

* 以下為程式大部分架構（以 echo server 為例）
```c
#include <stdio.h>
#include <winsock.h>

int main(){
	SOCKET server_socket, client_socket;
	WSADATA data;
	struct sockaddr_in server, client;
    int client_size;
	char str[100];

	WSAStartup(0x101, &data);
	server_socket = socket(AF_INET, SOCK_STREAM, 0);
	server.sin_family = AF_INET;
	server.sin_port = htons(1234);
	server.sin_addr.s_addr = inet_addr("127.0.0.1");

	bind(server_socket, (struct sockaddr *) &server, sizeof(server));

	listen(server_socket,5);
	while (1) {
        printf("Server waits...\n");
        client_size = sizeof(client);
        client_socket =  accept(server_socket, (struct sockaddr *)  &client, &client_size);
        while (1) {
            recv(client_socket, str, 100, 0);
            if (str[0] == '.') {
                break;
            }
            str[1] = '\0';
            printf("Server recveive:%s\n",str);
            send(client_socket, str, strlen(str) + 1, 0);
        }
        closesocket(client_socket);
	}
	closesocket(server_socket);
	WSACleanup();

	return 0;
}
```

### Echo Server
* 部分程式碼
```c
while (1) {
    printf("Server waits...\n");
    client_size = sizeof(client);
    client_socket =  accept(server_socket, (struct sockaddr *)  &client, &client_size);
    while (1) {
        recv(client_socket, str, 100, 0);
        if (str[0] == '.') {
            break;
        }
        str[1] = '\0';
        printf("Server recveive:%s\n",str);
        send(client_socket, str, strlen(str) + 1, 0);
    }
    closesocket(client_socket);
}
closesocket(server_socket);
```

* 說明
    - 有傳有回所以有 `recv()` 跟 `send()`
    - 若使用者輸入 `.` 就跳脫迴圈，並關閉客戶端連線，然後等待下一個用戶使用服務

* 測試結果
![demo](/images/telnet_echo_server.png)

### Discard Server
* 部分程式碼
```c
while (1) {
    printf("Server waits...\n");
    client_size = sizeof(client);
    client_socket = accept(sock, (struct sockaddr *) &client, &client_size);
    while (1) {
        reply = recv(client_socket, str, STR_SIZE, 0);
        if (reply > 0 && str[0] == '.') {
            break;
        }
        printf("Server receive: %s\n", str);
    }
    closesocket(client_socket);
}
```

* 說明
    - 只有傳沒有回，所以只有 `recv()`
    - 輸入 `.` 就關閉使用者連線，並等待下一個用戶使用

* 測試結果
![demo](/images/telnet_discard_server.png)

### Daytime Server
* 部分程式碼
```c
while (1) {
    printf("Server waits...\n");
    client_socket = accept(server_socket, (struct sockaddr *) &client, &client_size);

    time(&raw_time);
    time_info = localtime(&raw_time);
    printf("Current time is %s\n", asctime(time_info));
    send(client_socket, asctime(time_info), strlen(asctime(time_info)) + 1, 0);

    closesocket(client_socket);
}
```

* 說明
    - include `<time.h>` 函式庫，使用裡面的 function 來取得現在時間
    - `asctime` 的 `asc` 是指 `ASCII`，意即轉成人類看得懂的簡單時間格式

* 測試結果
![demo](/images/telnet_daytime_server.png)

### Quote Server
* 部分程式碼
```c
char quote[4][100] = {
    "Never give up!\0",
    "Go deeper, get higher.\0",
    "No pain, no gain.\0"
};

while (1) {
    printf("Server waits...\n");

    client_socket = accept(server_socket, (struct sockaddr *) &client, &client_size);
    random_number = rand() % 3;
    printf("Everyday quote: %s\n", quote[random_number]);
    send(client_socket, quote[random_number], strlen(quote[random_number]) + 1, 0);
    closesocket(client_socket);
}
```

* 說明
    - 把每日一句使用字元陣列儲存起來（記得 `\0` 結尾）
    - 使用 `<time.h>` 與 `<stdlib.h>` 來產生亂數，製造隨機句子的效果

* 測試結果
![demo](/images/telnet_quote_server.png)

### Character Generator Server
* 部分程式碼
```c
while (1) {
    printf("Server waits...\n");
    client_size = sizeof(client);
    client_socket = accept(server_socket, (struct sockaddr *) &client, &client_size);
    for (int j=0;j<LOOP_TIMES;j++) {
        for (int i=0;i<=126 - 32 + 1;i++) {
            printf("%c", i + ' ');
            str[0] = i + ' ';
            str[1] = '\0';
            send(client_socket, str, strlen(str) + 1, 0);
        }
    }
    closesocket(client_socket);
}
```

* 說明
    - 利用 `for` 迴圈傳送編號 `32` ~ `126` 的字元
    - 總共傳送 `LOOP_TIMES` 次，即關閉連線


* 測試結果
![demo](/images/telnet_chargen_server.png)

### 本週心得
這次寫的程式總算像個程式了！可以利用 `telnet` 去使用我們寫的服務，實作一個 server！
之後還會學到如何處理同時連線的用戶，加油！
