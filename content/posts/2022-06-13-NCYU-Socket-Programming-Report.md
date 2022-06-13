---
title: "[專題] Leave Your Behind! 留下你的足跡！"
date: 2022-06-13T23:02:37+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## Leave Your Behind! 留下你的足跡！
### 前言
這是網路程式設計的期末專題，
因為規定要用 `socket` 來撰寫程式，
加上自己喜歡有界面的成果，所以就利用網頁來寫一個小遊戲！

* [成果網址](https://leave-your-behind.herokuapp.com)

### 題目
網頁小遊戲

### 說明
* 玩法：
    * 上下左右操控角色移動，盡可能留下屬於自己的顏色。
    * 集滿四位玩家，並倒數三秒，即開始遊戲
    * 右方為記分板，記的是佔地的比例，倒數三十秒，時間到佔地最多的即為贏家！

* 動機：
    * 遊戲玩法是參考現今很紅的遊戲——[糖豆人](https://www.youtube.com/watch?v=lcdh2zudOOY)，裡面的其中一個模式。
    而這模式也很像任天堂出的一款遊戲——[漆彈大作戰](https://www.youtube.com/watch?v=qN4w5D2tzME)。
    所以就從這兩個遊戲發想，並把這遊戲名稱取為 「Leave Your behind！留下你的足跡！」，
    人生短短，我們要把握每一分每一秒，盡可能的留下屬於自己的足跡！

### 執行過程說明
* 一開始的介紹頁面（點《 開始遊玩 》會到遊玩頁面）
![demo](/images/LYB-introduction.gif)

* 等待畫面（可以自由移動，四位玩家到齊才會開始）
![demo](/images/LYB-introduction1.gif)

* 一人 demo 畫面（時間到就不能移動）
![demo](/images/LYB-introduction2.gif)

* 三人 demo 畫面（最終贏家是藍色！）
![demo](/images/LYB-introduction3.gif)

### 架構
由一個 server 對應多個 clients，
最多四位 client，多的不會被 server 所採納（沒有排隊機制）。

* Server 負責
    * 遊戲開始及結束還有重新開始
    * 更新各角色位置（更新棋盤）

* Client 負責
    * 角色控制
    * 倒數計時
    * 記分板計算以及贏家顯示

### 功能
* 開心玩遊戲！
* 消磨時間 . . .
* 培養感情～

### 技術
全部都是 `JavaScript` 來撰寫，些許 `HTML` 與 `CSS`。
* 前端遊戲畫面：p5.js
* 後端伺服器操控：node.js
* websocket：socket.io
* 伺服器架設：Heroku

### 人員分工與時間分配
只有我，only me!

一開始先兜前端頁面（角色操控），
再來是多人遊玩（本機測試），
最後都沒問題才放上可對外的伺服器！

### 心得
想用 `websocket` 來寫程式是這堂課最一開始的想法，如今我也做到了。

老實說，一開始真的只有想法，並沒有十足的把握能做出來，所以選擇了自己一個人一組，這樣才沒有太多壓力，
可以照著自己的步調開發！最先的想法是想要做 `你畫我猜`，但是有同學先偷跑而且做完了，不想跟別人主題重疊的我就從實況上找靈感，
所以就有現在的作品了！

作品在五月底就有雛形了，只是因為不幸確診 `COVID-19`，讓自己休息了一個禮拜，完全沒有寫程式，加上自己很嚴重的拖延症，
在死線的前兩天加上了計時器以及部署到伺服器，終於完成了！可喜可樂！

### 程式碼
* [qaz5823091/LeaveYourBehind](https://github.com/qaz5823091/LeaveYourBehind)
* 以下為程式碼分享（介紹概念，不詳細介紹）
    * Client 有五種物件以及一個程式進入點（[程式碼](https://github.com/qaz5823091/LeaveYourBehind/tree/main/public/js)）
        * Board（棋盤）
        * Character（角色）
        * ScoreBoard（記分板）
        * Config（設定檔）
        * p5.timer（計時器，別人開發的套件）
        * Main（主程式）
            * 超過人數上限警示
            ```JavaScript
            socket.on('message', (msg) => {
                if (msg['status'] == 'error') {
                    alert(msg);
                    redirect();
                }
            });
            ```

            * 取得初始設定
            ```JavaScript
            function getConfig(setting) {
                board.config = setting.board;
                character.config = setting.character;
                score_board.config = setting.board;
                names = setting.name;
            }
            ```

            * 遊戲開始（開啟倒數計時器）
            ```JavaScript
            socket.on('message', (data) => {
                if (data['status'] == 'start') {
                    is_start = true;
                    timer.start();
                }
            });
            ```

            * 遊戲結束（發送訊息給伺服器）
            ```JavaScript
            if (timer.expired() && !is_end) {
                is_end = true;
                socket.emit('message', {
                    status: 'end',
                    msg: '遊戲結束'
                });
            }
            ```

            * 控制角色移動（最後一行為發送角色資訊給伺服器更新棋盤）
            ```JavaScript
            function keyPressed() {
                if (is_end) {
                    return ;
                }
                let pos = character.getPosition();
                if (keyCode === LEFT_ARROW) {
                    pos.x = (pos.x - 1 < 0) ? pos.x : pos.x - 1;
                }
                else if (keyCode === RIGHT_ARROW) {
                    pos.x = (pos.x + 1 > board.w - 1) ? pos.x : pos.x + 1;
                }
                else if (keyCode === UP_ARROW) {
                    pos.y = (pos.y - 1 < 0) ? pos.y : pos.y - 1;
                }
                else if (keyCode === DOWN_ARROW) {
                    pos.y = (pos.y + 1 > board.h - 1) ? pos.y : pos.y + 1;
                }
                character.position = pos;
                socket.emit('character', character);
            }
            ```
    * Server（[程式碼](https://github.com/qaz5823091/LeaveYourBehind/blob/main/server.js)）
        * 玩家加入
        ```JavaScript
        io.on('connection', (socket) => {
            console.log('socket id: ', socket.id);
            client_sockets.push(socket);
        });
        ```

        * 玩家超過上限不處理
        ```JavaScript
        if (client_sockets.length > MAXIMUM_PLAYERS) {
            socket.emit('message', {
                status: 'error',
                msg: "人數已達上限"
            });
            client_sockets.pop();
            return ;
        }
        ```

        * 更新位置資訊給 Client
        ```JavaScript
        socket.on('character', refreshTable);
        function refreshTable(data) {
            config.table[data.y][data.x] = data.id;
            socket.broadcast.emit('other', data);
            io.sockets.emit('table', config.refreshedTable);
        }
        ```

        * 遊戲開始（玩家到達指定人數，傳送訊息給 Client）
        ```JavaScript
        if (client_sockets.length == MAXIMUM_PLAYERS){
            setTimeout(gameStart, 3000);
            function gameStart() {
                io.emit('message', {
                    status: 'start',
                    msg: '遊戲開始'
                });
                config.resetTable();
            }
        }
        ```

        * 遊戲結束並準備重新開始
        ```JavaScript
        socket.on('message', getMessage);
        function getMessage(data) {
            if (data['status'] == 'end') {
                client_sockets = [];
                config.resetTable();
            }
        }
        ```

### 參考
* [p5.js](https://p5js.org/)
* [p5.timer.js](https://github.com/scottkildall/p5.timer)
* [node.js](https://nodejs.org/)
* [socket.io](https://socket.io/)
* [Heroku](https://www.heroku.com/)
* [Fall Guys - Season 4 - Power Trip](https://www.youtube.com/watch?v=lcdh2zudOOY)
* [Splatoon 2 - Nintendo Switch Presentation 2017 Trailer](https://www.youtube.com/watch?v=qN4w5D2tzME)
* [12.1: Introduction to Node - WebSockets and p5.js Tutorial](https://www.youtube.com/watch?v=bjULmG8fqc8)
* [Realtime Chat With Users & Rooms - Socket.io, Node & Express](https://www.youtube.com/watch?v=jD7FnbI76Hg)
