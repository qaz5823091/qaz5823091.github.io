var content = "";
var countDownDate = new Date("Jan 1, 2021 00:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var distanceSeconds = hours * 3600 + minutes * 60 + seconds;
  // Display the result in the element with id="demo"

  var word = "倒數 " + minutes + " 分鐘 " + seconds + " 秒 ";

  if (hours != 0) {
    document.getElementById("time").innerHTML = "倒數 " + hours + " 小時 " + minutes + " 分鐘 " + seconds + " 秒 ";
  }
  else if (minutes != 0) {
    document.getElementById("time").innerHTML = "倒數 " + minutes + " 分鐘 " + seconds + " 秒 ";
  }
  else {
    document.getElementById("time").innerHTML = seconds;
  }


  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("time").innerHTML = "新年快樂!";
    document.getElementById("firework1").innerHTML = `
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>
    <div class="explosion red"></div>`

    document.getElementById("firework2").innerHTML = `
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>
    <div class="explosion purple"></div>`

    document.getElementById("firework3").innerHTML = `
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>
    <div class="explosion"></div>`
  }

}, 1000);
