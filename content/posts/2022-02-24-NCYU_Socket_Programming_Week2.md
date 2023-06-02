---
title: "[作業] 網路程式設計 Week 2"
date: 2022-02-24T00:04:58+08:00
author: "CPP"
draft: false
tags: [NCYU, SocketProgramming, Homework]
summary: "國立嘉義大學網路程式設計作業，可觀摩但請勿抄襲。"
---

## 網路程式設計 Week2

### 簡介 Wireshark
Wireshark 是一個 Network Analyzer 網路封包解析器，它透過現在連的網路來截取封包，
並查看封包的訊息、協定、大小 ... 等等。

![demo](https://www.wireshark.org/assets/images/favicon.ico)
👆 這是它的 LOGO！

### 安裝 Wireshark
* Windows
點選 [Wireshark · Download](https://www.wireshark.org/download.html)，
再點選 `Windows Installer` ，接著就照指示安裝
    > **Note :** 記得也要裝 Npcap，若安裝程式沒有提示，請到 [Npcap: Windows Packet Capture Library &amp; Driver](https://npcap.com/#download) 下載。

* Arch Linux
    - GUI for Wireshark（圖形界面）
    ```console
    $ sudo pacman -Sy wireshark-qt
    ```

    - CLI for Wireshark（文字界面）
    ```console
    $ sudo pacman -Sy wireshark-cli
    ```
    - 安裝後記得創立一個群組 `wireshark`，並把自己的使用者加入群伹
    ```console
    $ sudo usermod -aG wireshark {username}
    ```

* Windows 執行畫面
![demo](/images/wireshark_start.png)
    > **Note :** 雙擊現在正在使用的網路（乙太網路）即可開始查看封包

### 抓取封包
> **Note :** 滑鼠左鍵雙擊一封包即可查看封包詳細資料

* HTTP（Hyper Text Transmission Protocol）
    - filter: `http`
    ![demo](/images/wireshark_http.png)
* IP（Internet Protocol）
    - 在 `HTTP` 裡找得到
    - source ip: 192.168.1.112
    - destination ip: 45.113.129.141
    ![demo](/images/wireshark_ip.png)
* TCP（Transmisson Control Protocol）
    - `HTTP` 使用 `TCP` 傳送，所以在 `HTTP` 的 packet 裡找的到
    - source port: 63348
    - destination port: 443
    ![demo](/images/wireshark_tcp.png)
* DNS（Domain Name System）
    - filter: `dns`
    ![demo](/images/wireshark_dns.png)
* UDP（User Datagram Protocol）
    - `DNS` 使用 `UDP` 傳送，所以在 `DNS` 的 packet 裡找得到
    - source port: 59967
    - destination port: 53
    ![demo](/images/wireshark_udp.png)
* ARP（Address Resolution Protocol）
    - filter: `arp`
    ![demo](/images/wireshark_arp.png)
* ICMP（Internet Control Message Protocol）
    - filter: `icmp`
    ![demo](/images/wireshark_icmp.png)

### 本週心得
很喜歡上課有實作的部分，而且還能順便驗收上學期修 `計算機網路` 的理論。  
很期待下次可以開始來寫程式操作 `socket`!
