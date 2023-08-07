// Global Variables
let currentQuestionIndex = 0;
let timeLeft = 10;
let timerInterval;

// DOM Elements
const startButton = document.getElementById("start");
const answerReply = document.getElementById("answer-reply");
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question-title");
const answersContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit");
const counter = document.getElementById("time");
const replyDash = document.getElementById("reply-dash");
const correctAudio = document.getElementById("correct-audio");
const incorrectAudio = document.getElementById("incorrect-audio");
const feedback = document.getElementById("feedback");
const highScore = document.getElementById("highscores");
const clearButton = document.getElementById("clear");


// Event Listeners
startButton.addEventListener("click", startQuiz);
answersContainer.addEventListener("click", checkAnswer);
submitScoreButton.addEventListener("click", saveScore);

// Functions
function startQuiz() {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
  startTimer();
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersContainer.innerHTML = "";

    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      answersContainer.appendChild(button);
    });
  } else {
    endQuiz();
  }
}

let score = 0;
function checkAnswer(event) {
  if (event.target.matches("button")) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      // replyDash.textContent = " _______________________________";
      feedback.textContent = "   Correct!";
      correctAudio.play();
      score++;
    } else {
      // replyDash.textContent = " _______________________________";
      feedback.textContent = "   Inorrect!";
      incorrectAudio.play();
    }

    currentQuestionIndex++;
    showQuestion();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    counter.textContent = timeLeft;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  finalScore.textContent = score;
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    // Save initials and score to localStorage
    localStorage.setItem("intials", initials);
    window.location.href = "../../starter/highscores.html";

    var li = document.createElement("li");
    var result = { initials: score };
    localStorage.setItem("result", JSON.stringify(result));
    li.textContent = localStorage.getItem(JSON.parse(result));
     console.log(localStorage.getItem(JSON.parse(result)));
  } else {
    alert("Please enter your initials.");
  }
}

function clearLocalStorage() {
  localStorage.clear();
}

clearButton.addEventListener("click", clearLocalStorage);

