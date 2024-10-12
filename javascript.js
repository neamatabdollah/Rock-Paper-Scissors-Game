/*const score = {
  wins: 0 , 
  losses: 0 ,
  ties: 0 
} ;*/


/* to get the values from localstorage */
let score = JSON.parse(localStorage.getItem('score'));

if (score === null){ // (score ==== null) == (!score) 
  score = { 
    wins: 0 ,
    losses: 0 ,
    ties: 0
  };
};


const userResultElement = document.querySelector('.userResult');
const userAndComputerMove = document.querySelector('.userAndComputerMove');
scoreFunc();

// function to autoplay every 1 second
let isAutoPlay = false;
let intervalId;
let autplayButton = document.querySelector('.autplayButton');
autplayButton.addEventListener('click', function(){ autoPlay(); });
function autoPlay() {
  if(!isAutoPlay){
    intervalId = setInterval(function(){ // function() === () =>
      let userMove = computerMoves();
      mouseClick(userMove);
    }, 1000);  
    isAutoPlay = true;
    autplayButton.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlay = false; 
    autplayButton.innerHTML = 'Auto Play';
  }
};

// addEventListner instead of onclick event
let rockButton = document.querySelector('.rockButton');
rockButton.addEventListener('click', function(){ mouseClick('rock'); });
let paperButton = document.querySelector('.paperButton');
paperButton.addEventListener('click', function(){ mouseClick('paper'); });
let scissorsButton = document.querySelector('.scissorsButton');
scissorsButton.addEventListener('click', function(){ mouseClick('scissors'); });
// to use keys on the keyboard to play a game
document.body.addEventListener('keydown', function(event){ 
  if (event.key === 'r'){
    mouseClick('rock');
  } else if (event.key === 'p'){
    mouseClick('paper');
  } else if (event.key === 's'){
    mouseClick('scissors');
  } else if(event.key === 'Backspace'){
    resetButtonFunction();
  } else if(event.key === 'a'){
    autoPlay();
  };
});

function mouseClick(userMove){
  const computerMove = computerMoves();
  let result = '';
  if(userMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You lose.';
    } else if (computerMove === 'paper'){
      result = 'You win.';
    } else if (computerMove === 'scissors'){
      result = 'Tie';
    }

  } else if (userMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Tie';
    } else if (computerMove === 'paper'){
      result = 'You lose.';
    } else if (computerMove === 'scissors'){
      result = 'You win.';
    }

  } else if (userMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.';
    } else if (computerMove === 'paper'){
      result = 'Tie';
    } else if (computerMove === 'scissors'){
      result = 'You lose.';
    }
  };


  if (result === 'You win.'){
    score.wins += 1;
  } else if (result === 'You lose.'){
    score.losses += 1;
  } else if (result === 'Tie'){
    score.ties += 1;
  };

  /* to save the score result inside localstorage to can get it back */
  localStorage.setItem('score' , JSON.stringify(score));

  
  userResultElement.innerHTML = result;
  userAndComputerMove.innerHTML = `You 
    <img src="imgs/${userMove}-emoji.png" 
    class= "emoji">
    <img src="imgs/${computerMove}-emoji.png" 
    class= "emoji">
    computer.`;
  scoreFunc();
};

let resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', function(){resetButtonFunction(); });


function scoreFunc(){
  document.querySelector('#score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}; 
  
function resetButtonFunction(){
  document.querySelector('.yesNoContainer').innerHTML = 
  `Are you sure you want to reset the score?
    <button class="yesButton" onclick ="
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      scoreFunc();
      hideResetConfirmation();
    ">Yes</button>
    <button class="noButton" onclick = "
      hideResetConfirmation();
    ">No</button>`;
};
function hideResetConfirmation() {
  document.querySelector('.yesNoContainer')
    .innerHTML = '';
};

function computerMoves(){
  let randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }  
  return computerMove;
};


// window.onload = function() {
//   document.querySelector('p').innerHTML = "";
// }

// function removeOnReset() {
//   if (!score) {
//   //userResultElement.remove();
//   //userAndComputerMove.remove();
//   //document.querySelector('#score').remove();
//   userResultElement.style.display = 'none';
//   userAndComputerMove.style.display = 'none';
//   document.querySelector('#score').style.display = 'none';
//   } else {
//   userResultElement.style.display = 'block';
//   userAndComputerMove.style.display = 'block';
//   document.querySelector('#score').style.display = 'block';
//   }  
// };

