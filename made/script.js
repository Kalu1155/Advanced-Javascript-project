// script.js
const registrationDeadline = new Date("Mar 4, " + new Date().getFullYear());
const fineAmount = 5000; // Naira
let quizQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is my name", answer: "KALU" },
  { question: "What is my age", answer: "16" },
  // Add more questions here
];
let currentQuestionIndex = 0;
let startTime;

function register() {
  const currentDate = new Date();
  if (currentDate <= registrationDeadline) {
    // Allow registration
    alert("Registration successful!");
    document.getElementById("quizContainer").style.display = "block";
  } else {
    // Charge a fine
    alert("Registration deadline has passed. You are fined N5,000.");
    // Implement payment logic here
  }
}

function displayQuestion() {
  document.getElementById("question").innerText = quizQuestions[currentQuestionIndex].question;
}

function submitAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();
  if (answer === correctAnswer) {
    document.getElementById("result").innerText = "Correct!";
  } else {
    document.getElementById("result").innerText = "Incorrect!";
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    // Display results modal
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const percentageResult = calculatePercentageResult(timeTaken);
    alert("Quiz completed! Your percentage result: " + percentageResult + "%");
    // Implement logic to save winners
    displayWinnersModal();
  }
}

function calculatePercentageResult(timeTaken) {
  const totalTimeAllowed = 120; // in seconds
  const questionsCount = quizQuestions.length;
  const maxScore = questionsCount * 10; // Each correct answer gets 10 points
  const score = Math.round((timeTaken / totalTimeAllowed) * maxScore);
  return (score / maxScore) * 100;
}

function displayWinnersModal() {
  const modal = document.getElementById("winnersModal");
  const span = document.getElementsByClassName("close")[0];
  const winnersList = document.getElementById("winnersList");
  // Implement logic to retrieve and display winners from storage
  winnersList.innerText = "Winners will be displayed here.";
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Start the quiz
function startQuiz() {
  startTime = new Date();
  displayQuestion();
}

// Start the quiz automatically when the page loads
startQuiz();
