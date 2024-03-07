function no() {
    alert("NOTE:That the compititon is on the "+ registrationDeadline +"and the registration has a deadline is a week before the compition. Also_Note:That if registration time has passed intrested school will pay a fine of the sum of $5,000 dollars per candidate.")
}
// const myDiv = document.getElementsByClassName("reminder")
// const para = document.createElement( "p" );
// para.appendChild(document.createTextNode(`NOTE:That the compititon is on the "${this.registrationDeadline}"and the registration has a deadline is a week before the compition. Also_Note:That if registration time has passed intrested school will pay a fine of the sum of $5,000 dollars per candidate.`));
// myDiv[0].appendChild(para);

const registrationDeadline = new Date("March 10, " + new Date().getFullYear());
const fineAmount = 5000; // Naira
let quizQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of France?", answer: "Paris" }
  // Add more questions here
];
let currentQuestionIndex = 0;
let startTime;

function register() {
  const currentDate = new Date();
  if (currentDate <= registrationDeadline) {
    // alert("Registration successful!");
    window.location.href = 'register.html';
    document.getElementById("quizContainer").style.display = "block";
    // console.log('uhijo')
  } else {
    alert("Registration deadline has passed. You are fined N5,000 before registration");
    let payme  = prompt("pls  enter amount to be paid "+fineAmount);
    
    if(payme < fineAmount){
      alert(`Sorry you do not have enough money to clear your debt.\nYou owe N${fineAmount-payme}`);
      alert("would u like to enter a new amount")
      var yn=prompt("press Y for yes or N for No");
      
      if(yn=='Y'|| yn =='y'){
        payme = prompt("Enter the amount you want to pay");
        if(Number(payme)+ Number(payme)>fineAmount){
          alert("you can't over pay");
          payme=prompt("please re-enter the amount you would like to pay");
        }else{
          fineAmount -= Number(payme);
          alert(`your remaining balance is N ${fineAmount - Number(payme)}`);
        }
      }
    }else{
      // alert("Congratulations! Your account has been created.");
      window.location.href = 'register.html';
    }
    // window.location.reload();
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');
  
    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        // Validate form inputs
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
  
        // Schhool inputs
        const schoolName = document.getElementById('schoolName')
        const schoolEmail = document.getElementById('schoolEmail')
        const schoolPassword = document.getElementById('schoolPassword')
        // Student input
        const studentName1 = document.getElementById('studentName1')
        const studentName2 = document.getElementById('studentName2')
        const studentName3 = document.getElementById('studentName3')
        const studentName4 = document.getElementById('studentName4')
        // Create user object
        const schoolData = {
            schoolName: schoolName,
            schoolEmail: schoolEmail,
            schoolPassword: schoolPassword,
            students: [
                {name: studentName1},
                {name: studentName2},
                {name: studentName3},
                {name: studentName4}
            ]
        };
        const hashedPassword = hashPassword(schoolPassword);
        localStorage.setItem('schoolData', JSON.stringify(schoolData));
        var schoolLog = JSON.parse(localStorage.getItem('schoolData'));
        console.log(schoolLog);

    });

});
});
// const hashedPassword = hashPassword(schoolPassword);
function hashPassword(schoolPassword) {

  return schoolPassword;
}
function signIn(username, schoolPassword) {
  const userData = JSON.parse(localStorage.getItem(schoolPassword));
  var schoolLog = JSON.parse(localStorage.getItem('schoolData'));
  if (schoolLog) {
      const hashedPassword = hashPassword(schoolPassword);
      if (hashedPassword === schoolLog.schoolPassword) {
          // return true;
          window.location.href = 'index.html';
      } else {
          return false;
      }
  } else {
      return false; 
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
    // results modal
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const percentageResult = calculatePercentageResult(timeTaken);
    alert("Quiz completed! Your percentage result: " + percentageResult + "%");
    // logic to save winners
    displayWinnersModal();
  }
}

function calculatePercentageResult(timeTaken) {
  const totalTimeAllowed = 12000;
  const questionsCount = quizQuestions.length;
  const maxScore = questionsCount * 10; // Each correct answer gets 10 points
  const score = Math.round((timeTaken / totalTimeAllowed) * maxScore);
  return (score / maxScore) * 100;
}

function displayWinnersModal() {
  const modal = document.getElementById("winnersModal");
  const span = document.getElementsByClassName("close")[0];
  const winnersList = document.getElementById("winnersList");
  // logic to retrieve and display winners from storage
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
function startQuiz() {
  startTime = new Date();
  const targetTime = new Date().getTime() + 60000;
const timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;
    if (remainingTime <= 0) {
      // alert("Time\'s up!")
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = 'Time\'s up!';
        window.location.href = 'welcome.html';
        return;
    }
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    document.getElementById('timer').textContent = `Time remaining: ${seconds} seconds`;
}
  displayQuestion();
}
startQuiz();

// let data =  JSON.parse( localStorage.schoolData );
// console.log(schoolData);
// console.log("hi");