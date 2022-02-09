---
title: "[記錄] SSG with Hugo"
date: 2022-02-09T21:12:05+08:00
author: "CPP"
draft: false
tags: [Record, SSG, Hugo]
---

## 簡介 SSG
SSG 全名 Static Site Generator ，中文名「靜態網站產生器」，一般用來架設個人網站、部落格。  
透過渲染 markdown 的文件變成 HTML 的網頁是它最大的特點，
而各大 SSG framework 的社群提供了非常多樣的主題（theme）可以套用，
實屬美術白痴但想架設漂亮部落格的福音！

## SSG 種類
著名且有在更新的 SSG framework 有以下幾個：
* [Hugo](https://gohugo.io/) - Go （本站目前選用）
* [Jekyll](https://jekyllrb.com/) - Ruby （上一版本選用）
* [Hexo](https://hexo.io/) - JavaScript
* [更多...](https://jamstack.org/generators/)

## 簡介 Hugo
Hugo 號稱 the world's fastest framwork for building websites，是世界上架設網站最快的框架。  

其實我不知道啦，本來好像要架 Hexo 的，但他跟 Hugo 長好像所以就記錯了。不過 Hugo 是由 Go 語言寫成的，
而 [Go Language](https://go.dev/) 是 Google 推出的語言。  

## 部署 SSG 到 Github Pages
* 首先要先下載 Hugo 的環境（Arch Linux）
```console
$ sudo pacman -Sy hugo
```  


* 下載後新增新的網站（`{}` 內為使用者自行輸入）
```console
$ hugo new site {your_site_name}
```

* 再來選擇自己喜歡的[主題](https://themes.gohugo.io/)
    > 這邊使用的是 [PaperMod](https://themes.gohugo.io/themes/hugo-papermod/)

* 最後 Do Re Mi Sol ，就完成了！

## 參考資料
* [Paper Mod Installation](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-installation/)
* [如何將Hugo部落格部署到Github上?](https://yurepo.tw/2021/03/%E5%A6%82%E4%BD%95%E5%B0%87hugo%E9%83%A8%E8%90%BD%E6%A0%BC%E9%83%A8%E7%BD%B2%E5%88%B0github%E4%B8%8A/)
