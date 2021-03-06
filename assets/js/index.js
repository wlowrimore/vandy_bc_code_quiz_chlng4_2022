var timeDisplay = document.getElementById("timeDisplay");
var timer = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var questionDiv = document.getElementById("question");
var answerBtn1 = document.getElementById("answer1");
var answerBtn2 = document.getElementById("answer2");
var answerBtn3 = document.getElementById("answer3");
var answerBtn4 = document.getElementById("answer4");
var answerBtn5 = document.getElementById("answer5");
var feedback = document.getElementById("feedback");
var title = document.getElementById("title");

var qNum = 0;
var timeLeft = 0;
var quizTime = 0;
var score = 0;

// checks if any highscores exist. If so it renders them to highscores page
if (title.innerHTML === "Highscores") {
  renderTable();
}

// starts quiz by putting 75 seconds on timer to begin counting down and begins questions loop
function quizStart() {
  timeLeft = 75;
  startTimer();
  initQ();
}
function startTimer() {
  timer.innerHTML = timeLeft;
  quizTime = setInterval(tick, 1000);
}
function tick() {
  if (timeLeft !== 0) {
    timeLeft--;
    timer.innerHTML = timeLeft;
  } else {
    clearInterval(quizTime);
    quizOver();
  }
  return;
}
function initQ() {
  document.querySelectorAll(".main").forEach((main) => {
    main.style.display = "none";
  });
  document.querySelectorAll(".quiz").forEach((quiz) => {
    quiz.style.display = "initial";
  });
  quiz(qNum);
}
function quiz() {
  if (qNum >= questionsArray.length) {
    quizOver();
  } else {
    questionDiv.innerHTML = questionsArray[qNum].title;
    answerBtn1.innerHTML = questionsArray[qNum].choices[0];
    answerBtn2.innerHTML = questionsArray[qNum].choices[1];
    answerBtn3.innerHTML = questionsArray[qNum].choices[2];
    answerBtn4.innerHTML = questionsArray[qNum].choices[3];
    answerBtn5.innerHTML = questionsArray[qNum].choices[4];
  }
}
function answerCheck(btnId) {
  if (
    document.getElementById(btnId).innerHTML === questionsArray[qNum].answer
  ) {
    rightAnswer();
    qNum++;
  } else {
    wrongAnswer();
    qNum++;
  }
  quiz(qNum);
}
function rightAnswer() {
  score = timeLeft;
  result.innerHTML = "Correct";
  setTimeout(function () {
    result.innerHTML = "";
  }, 1000);
}
function wrongAnswer() {
  timeLeft = timeLeft - 10;
  result.innerHTML = "Wrong";
  setTimeout(function () {
    result.innerHTML = "";
  }, 1000);
}

// when quiz is over the final score is rendered and user can enter their initials. Upon clicking "submit", the users score and initals are
// sent to local storage where they are stored for retrieval when accessed throught the "view highscores" link in main page header.
function quizOver() {
  document.querySelectorAll(".quiz").forEach((quiz) => {
    quiz.style.display = "none";
  });
  var content = document.getElementById("theContent");
  var done = document.getElementById("done");
  var submit = document.getElementById("submit");

  timer.innerHTML = 0;

  content.insertAdjacentHTML(
    "afterbegin",
    '<h1 id="done">All Done!</h1> <input placeholder="Enter Initials" id="userScore"><button id="submit" class="score-submit">Submit</button></input>'
  );

  var done = document.getElementById("done");
  done.insertAdjacentHTML(
    "afterend",
    '<p class="final-score" id="finalScore">Your final score is ' +
      score +
      "</p>"
  );

  var submit = document.getElementById("submit");
  submit.addEventListener("click", function () {
    var value = document.getElementById("userScore").value;
    localStorage.setItem(value, score);
    window.location.href = "highscore.html";
  });
  clearInterval(quizTime);
}

// pulls in highscores/user initials from local storage
function renderTable() {
  var tbody = document.getElementById("tableBody");
  for (let i = 0; i < localStorage.length; i++) {
    var userName = localStorage.key(i);
    var userScore = localStorage.getItem(userName);
    tbody.insertAdjacentHTML(
      "afterbegin",
      '<tr class="scores"><td>' + userName + " - " + userScore + "</td></tr>"
    );
  }
}

// when the "clear highscores" button is clicked this function fires to clear local storage
function clearStorage() {
  localStorage.clear();
  window.location.reload();
}
