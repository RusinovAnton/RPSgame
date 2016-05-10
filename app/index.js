var removeClass = require('./utils/removeClass');
var addClass = require('./utils/addClass');

var startButton = document.getElementById('startButton');
var startGame = document.getElementById('startGame');
var choiceButtons = document.getElementById('choiceButtons');
var result = document.getElementById('result');
var user = document.getElementById('user');
var computer = document.getElementById('computer');
var winnerBattle = document.getElementById('winnerBattle');
var resultBattle = document.getElementById('resultBattle');
var winnerGame = document.getElementById('winnerGame');

var totalu;
var totalc;
var totalt;

/**
 * @param rounds - amount of rounds to play;
 * @constructor RPS game start;
 */
function Game(rounds) {

  this.gameStarted = false;
  this.rounds = rounds || 0;
  this.roundsPlayed = 0;


  this.startGame = function () {
    this.gameStarted = true;

    // Hide start button
    addClass(startButton, 'hide');
    // Show choice buttons
    removeClass(choiceButtons, 'hide');
    // Show result
    removeClass(result, 'hide');

    totalu = 0;
    totalc = 0;
    totalt = 0;
    resultBattle.innerHTML = "Computer: " + totalc + '<br>' + "User: " + totalu + '<br>' + "Tie: " + totalt;

  };

  this.endGame = function () {
    this.gameStarted = false;

    // Show start button
    removeClass(startButton, 'hide');
    // Hide choice buttons
    addClass(choiceButtons, 'hide');


  };

  this.playRound = function (userChoice) {
    console.log(userChoice);
    console.log(this.compareChoices(userChoice, this.computerChoice()));
    user.innerHTML = "User: " + userChoice;
    resultBattle.innerHTML = "Computer: " + totalc + '<br>' + "User: " + totalu + '<br>' + "Tie: " + totalt;
  };

  this.computerChoice = function () {
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      computerChoice =  "rock";
      computer.innerHTML = "Computer: " + computerChoice;                 //?????
      return "rock";
    } else if (computerChoice <= 0.67) {
      computerChoice =  "paper";
      computer.innerHTML = "Computer: " + computerChoice;                     //?????
      return "paper";
    } else {
      computerChoice = "scissors";
      computer.innerHTML = "Computer: " + computerChoice;               //?????
      return "scissors";
    }
  };
  /**
   * Comparing choices of computer and user
   * @param userChoice
   * @param computerChoice
   * @returns bool -  true=user wins; false=computer wins; -1=tie;
   */
  this.compareChoices = function (userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      winnerBattle.innerHTML = "Winner: " + 'none';
      totalt += 1;
      return -1;
    } else if (userChoice === "rock") {
      if (computerChoice === "scissors") {
        winnerBattle.innerHTML = "Winner: " + 'user';
        totalu += 1;
        return true;
      } else {
        winnerBattle.innerHTML = "Winner: " + 'computer';
        totalc += 1;
        return false;
      }
    } else if (userChoice === "paper") {
      if (computerChoice === "rock") {
        winnerBattle.innerHTML = "Winner: " + 'user';
        totalu += 1;
        return true;
      } else {
        winnerBattle.innerHTML = "Winner: " + 'computer';
        totalc += 1;
        return false;
      }
    } else if (userChoice === "scissors") {
      if (computerChoice === "paper") {
        winnerBattle.innerHTML = "Winner: " + 'user';
        totalu += 1;
        return true;
      } else {
        winnerBattle.innerHTML = "Winner: " + 'computer';
        totalc += 1;
        return false;
      }
    } else {
      throw new Error('Unacceptable answer');
    }
  }
}

var rounds;

startGame.addEventListener('click', function () {
  rounds = prompt('How many rounds?');
  window.newGame = new Game(rounds);
  newGame.startGame();

});

choiceButtons.addEventListener('click', function (e) {
  var target = e.target;
  if (target.className.match(/btn-choice/)) {

    newGame.playRound(target.dataset.choice);

  }
  if( !(totalu < rounds)) {

    newGame.endGame();
    winnerGame.innerHTML = 'You win';
  }
  if( !(totalc < rounds)) {

    newGame.endGame();
    winnerGame.innerHTML = 'You lose';
  }
});
