---
title: "[Web] 讓我幫你 Google"
date: 2021-02-10T19:54:00+08:00
categories: [jekyll]
tags: [Web,HTML,CSS,JS]
---
<br>
### Let me Google for you!

<br>
翻成中文意思是讓我幫你 Google！<br>
相信大家常常在各程式社團看到伸手文，<br>
有些人會耐心指導，<br>
有些人則會用這個東西來嘲諷發文者根本沒上網爬文過就來伸手！
<br><br>

#### 利用工具
這次使用 HTML + CSS + JavaScript 的組合。<br>

* HTML ： 網頁所看到的所有元件<br>
* CSS ： 負責美編<br>
* JS ： 呈現打字動畫及跳轉搜尋畫面
<br>

#### 程式發想
打完字按下 `送出`，`鎖定` 按鈕不讓使用者再次送出，<br>
顯示打字 `動畫` ，最後 `跳轉` 到搜尋結果
<br>

#### 程式實作
* 利用 `setIntervel` 來製作間隔動畫

```javascript
  var interval = setInterval(async function() {
    ...
  },intervalTime);
```
* 逐一增加文字到原文字長度

```javascript
  if (index == questionText.length) {
    clearInterval(interval);
  }
```
* 使用 `setTimeout` 來製作 delay 效果

```javascript
  var delay = setTimeout(function() {
    ...
  },forwardTime);
```
* 最後用 `get` 參數跳轉到 Google 網頁

```javascript
  window.location.assign("https://www.google.com/search?q=" + questionText);
```
---
ㄏ ㄏ <br>
一個很廢的小程式 . . .

---

#### 作品成果
* [LMGTFY 網頁](https://www.cppwebs.ga/lmgtfy)
* [Github Code](https://github.com/qaz5823091/LMGTFY/)

#### 參考資源
* [LMGTFY](https://lmgtfy.app/)
