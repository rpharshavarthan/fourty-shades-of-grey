window.onload = function () {
  document.getElementById("grid-box").style.display = "none";
  document.getElementById("scorecard").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("playagain").style.display = "none";
};
var user;
var t;
var minutes = 0;
var seconds = 0;
var array1 = [];
var array2 = [];
var scores = [];
while (array1.length < 20) {
  var r = Math.floor(Math.random() * 20 + 1);
  if (array1.indexOf(r) === -1) {
    array1.push(r);
  }
}
while (array2.length < 20) {
  var r = Math.floor(Math.random() * 40 + 1);
  if (array2.indexOf(r) === -1 && r > 20) {
    array2.push(r);
  }
}
var form = document.getElementById("userForm");
form.addEventListener("submit", userName);
function userName(event) {
  event.preventDefault();
  user = document.getElementById("username").value;
  playerinfo = { name: "", score: 0 };
  scores.push(playerinfo);
  scores[scores.length - 1].name = user;
  showNumbers();
}
function runTime() {
  t = setInterval(timer, 1000);
}
function stopTime() {
  console.log("yes");
  clearInterval(t);
  document.getElementById("time").innerHTML = `<span>TIME ~ </span> 0:00`;
  minutes = 0;
  seconds = 0;
}
function timer() {
  seconds += 1;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
  if (seconds < 10) {
    document.getElementById(
      "time"
    ).innerHTML = `<span>TIME ~ </span> ${minutes}:0${seconds}`;
  } else {
    document.getElementById(
      "time"
    ).innerHTML = `<span>TIME ~</span> ${minutes}:${seconds}`;
  }
}
function showNumbers() {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("grid-box").style.display = "grid";
  document.getElementById("timer").style.display = "grid";
  runTime();
  for (var i = 0; i < array1.length; i++) {
    document.getElementById(i).innerHTML = array1[i];
  }
}
var c = 1;
function nextNumber(k) {
  j = document.getElementById(k);
  if (c == j.innerHTML) {
    playAudio();
    j.innerHTML = array2[k];
    if (c > 20) {
      document.getElementById(k).style.visibility = "hidden";
      if (c == 40) {
        gameOver();
      }
    }
    c += 1;
  }
}
var audio = document.getElementById("clicksound");
function playAudio() {
  audio.play();
}
function playAgain() {
  document.getElementById("start-page").style.display = "flex";
  document.getElementById("scorecard").style.display = "none";
  document.getElementById("playagain").style.display = "none";
  document.getElementById("username").value = "";
  if (scores[0].score % 60 < 10) {
    document.getElementById("btime").innerHTML = `BEST TIME ~ ${Math.floor(
      scores[0].score / 60
    )}:0${scores[0].score % 60}`;
  } else {
    document.getElementById("btime").innerHTML = `BEST TIME ~ ${Math.floor(
      scores[0].score / 60
    )}:${scores[0].score % 60}`;
  }
  c = 1;
  for (var i = 0; i < 20; i++) {
    document.getElementById(i).style.visibility = "visible";
  }
  for (var j = 0; j < scores.length; j++) {
    document.getElementById("scoretable").deleteRow(1);
  }
}
function gameOver() {
  document.getElementById("grid-box").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("scorecard").style.display = "flex";
  document.getElementById("playagain").style.display = "block";
  scores[scores.length - 1].score = minutes * 60 + seconds;
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < scores.length; i++) {
    console.log(i);
    console.log(scores);
    var table = document.getElementById("scoretable");
    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = scores[i].name.toUpperCase();
    cell3.innerHTML = scores[i].score;
  }
  stopTime();
}
