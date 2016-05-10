var removeClass = require('./utils/removeClass');
var addClass = require('./utils/addClass');
var lodash = require('lodash');

var startButton = document.getElementById('startButton');
var startGame = document.getElementById('startGame');
var choiceButtons = document.getElementById('choiceButtons');

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
  };

  this.computerChoice = function () {
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      return "rock";
    } else if (computerChoice <= 0.67) {
      computerChoice = "paper";
    } else {
      computerChoice = "scissors";
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
      return -1;
    } else if (userChoice === "rock") {
      if (computerChoice === "scissors") {
        return true;
      } else {
        return false;
      }
    } else if (userChoice === "paper") {
      if (computerChoice === "rock") {
        return true;
      } else {
        return false;
      }
    } else if (userChoice === "scissors") {
      if (computerChoice === "paper") {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error('Unacceptable answer');
    }
  }

}

startGame.addEventListener('click', function () {
  var rounds = prompt('How many rounds?');
  window.newGame = new Game(rounds);
  newGame.startGame();
});

choiceButtons.addEventListener('click', function (e) {
  var target = e.target;
  if (target.className.match(/btn-choice/)) {

    newGame.playRound(target.dataset.choice);

  }
});