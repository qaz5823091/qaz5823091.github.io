---
title: "[作業] 網路程式設計 Week 9"
date: 2022-05-09T01:46:27+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week9
### 非阻攔
![demo](/images/non_blocking_1.png)

### 應用一
![demo](/images/non_blocking_2.png)

### 應用二
![demo](/images/non_blocking_3.png)

### 應用三
![demo](/images/non_blocking_4.png)

### 本週心得
之前在實作聊天室的時候，就覺得一開始的設計滿有問題的，所以我也用很有問題的方式去解決。
沒想到還有 `non-blocking` 的方式去 skip `recv()`、`accept()` 就不會卡在那邊了！
