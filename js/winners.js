const registrationDeadline = new Date("Jan, " + new Date().getFullYear());
const fineAmount = 5000; // Naira

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

const url = 'https://jsonplaceholder.typicode.com/users';
fetch(url)
            .then(response => response.json())
            .then(users => {
                const previousWinners = users.slice(0, 10).map((user, index) => ({
                    year: 2023 - index, 
                    school: user.company.name,
                    winner: user.name, 
                    percentage: `${Math.floor(Math.random() * 100)}%` 
                }));

                function populateTable() {
                    const tbody = document.getElementById('winnerTableBody');
                    previousWinners.forEach(winner => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${winner.year}</td>
                            <td>${winner.school}</td>
                            <td>${winner.winner}</td>
                            <td>${winner.percentage}</td>
                        `;
                        tbody.appendChild(row);
                    });
                }
                populateTable();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });