var countDownDate = new Date("Jan 1, 2021 00:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var distanceSeconds = hours * 3600 + minutes * 60 + seconds;
  // Display the result in the element with id="demo"

  if (hours != 0) {
    document.getElementById("time").innerHTML = "倒數 " + hours + " 小時 " + minutes + " 分鐘 " + seconds + " 秒 ";
  }
  else if (minutes != 0) {
    document.getElementById("time").innerHTML = "倒數 " + minutes + " 分鐘 " + seconds + " 秒 ";
  }
  else {
    document.getElementById("time").innerHTML = "倒數 " + seconds + " 秒 ";
  }


  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("time").innerHTML = "新年快樂!";
  }
}, 1000);
