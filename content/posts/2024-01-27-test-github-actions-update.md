---
title: "[測試] Github Actions Update"
date: "2024-01-27T22:31:37+08:00"
author: "CPP"
draft: false
tags: [Test]
summary: "Only test"
---

## Success?
yes

原本想幫部落格新增廣告 Google Ad Sense，發現標題下方的 `datetime` 跑掉了，看到 Github Actions 噴錯，以為是自動化的工具太舊了，所以就去更新 `workflow` 的內容，不過時間還是沒有跑回來。

後來想到可能是 `hugo` 版本太舊，所以就去更新它，也順便更新了 `keyring` 還有系統，結果咧！事情沒那個簡單！！！！！電腦壞了，系統壞了。

詢問朋友可能是 `mkinitcpio` 出了問題，改了 `config` 也砍掉 `npm` 重下 `pacman -Syu`，後來電腦回來了，`hugo` 也更新好了。

而最根本的問題就只是部落格主題的作者改了 `code`，我只要 `submodule update` 就好了......