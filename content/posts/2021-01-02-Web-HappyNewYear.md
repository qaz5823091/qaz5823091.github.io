---
title: "[Web] 新年快樂"
date: 2021-01-02T23:30:00+08:00
categories: [jekyll]
tags: [Web,HTML,CSS,JS]
---

<br>
Happy New Year ! 新年快樂 ！<br>

為了應景一下，自己扣出新年倒數的網頁啦！<br>
<br>

#### 利用工具
這次使用 HTML + CSS + JavaScript 的組合。<br>

* HTML ： 控制字及煙火的表現<br>
* CSS ： 負責美編（字的效果、煙火的顏色）<br>
* JS ： 主要是倒數及內嵌 HTML
<br>

#### 程式發想
倒數計時：到了 `2021 01/01 00:00:00` 就顯示 `新年快樂` ，並且 `放出煙火`
<br>

#### 程式實作
* 設定倒數終止時間

```javascript
var countDownDate = new Date("Jan 1, 2021 00:00:00").getTime();
```
* 每一秒重新取得新內容 （單位：毫秒）

```javascript
var x = setInterval(function() {
  // 函式內容
  }, 1000);
```
* 取得現在的時間 （使用者系統時間）

```javascript
var now = new Date().getTime();
```
* 更新並顯示倒數時間

使用 `innerHTML` 屬性，將文字內嵌到指定 `id` 的容器
```javascript
document.getElementById("time").innerHTML = "倒數 " + hours + " 小時 " + minutes + " 分鐘 " + seconds + " 秒 ";
```

* 時間到了，就停止計時

```javascript
clearInterval(x);
document.getElementById("time").innerHTML = "新年快樂!";
```

* 與此同時放入煙火特效

```javascript
document.getElementById("firework1").innerHTML = `!<--煙火特效-->`
```
* 修改煙火顏色 (紅色)

```css
.explosion {
  position: absolute;
  left: -2px;
  bottom: 0;
  width: 4px;
  height: 80px;
  transform-origin: 50% 100%;
  /* background-color: rgba(0,0,0,.2); */
  overflow: hidden;
}
.red::before {
  background-color: #f55252;
}
```
<br>

---
大概 joe 4 john 啦~<br>
希望今年我的 Web 功力能更好！

---

#### 作品成果
* [新年倒數網頁](https://qaz5823091.github.io/HappyNewYear.html)
* [Github Code](https://github.com/qaz5823091/HappyNewYear)

#### 參考資源
* [CSS Trick](http://css-tricks.neatbang.com/textShadow/#%E6%96%87%E5%AD%97%E5%A4%96%E5%8F%91%E5%85%89)
* [JavaScript Countdown Timer](https://www.w3schools.com/howto/howto_js_countdown.asp)
* [Simple Stick Fireworks Effect Using HTML & CSS](https://codepen.io/MinzCode/pen/abmwmOG)
