var removeClass = require('./utils/removeClass');
var addClass = require('./utils/addClass');

var GameLogger = require('./GameLogger');

/**
 * @param rounds - amount of rounds to play;
 * @constructor RPS game start;
 */
function Game(rounds) {

  function GameState() {
    this.gameStarted = false;
    this.rounds = rounds || 3;
    this.result = '';
    this.userChoice = '';
    this.computerChoice = '';
    this.roundsPlayed = 0;
    this.userScore = 0;
    this.computerScore = 0;
    this.tieScore = 0;
  }

  this.state = new GameState();

  this.startGame = function () {
    this.state.gameStarted = true;
    // Hide start button
    addClass(startButton, 'hide');
    // Show choice buttons
    removeClass(choiceButtons, 'hide');

    this.updateLog(this.state);
  };

  this.endGame = function () {
    this.gameStarted = false;
    // Show start button
    removeClass(startButton, 'hide');
    // Hide choice buttons
    addClass(choiceButtons, 'hide');
  };

  this.playRound = function (userChoice) {
    this.state.userChoice = userChoice;
    this.state.computerChoice = this.getComputerChoice();
    this.state.result = this.compareChoices(this.state.userChoice, this.state.computerChoice);
    this.state.roundsPlayed++;

    if (this.state.result !== -1) {
      if (this.state.result) {
        this.state.userScore++;
        this.state.result = 'User wins!';
      }
      else {
        this.state.computerScore++;
        this.state.result = 'Computah wins!';
      }
    } else {
      this.state.rounds++;
      this.state.tieScore++;
      this.state.result = 'Tie';
    }

    this.updateLog(this.state);

  };

  this.getComputerChoice = function () {
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      return "rock";
    } else if (computerChoice <= 0.67) {
      return "paper";
    } else {
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
  };

  this.updateLog = function (state) {
    this.logger = this.logger || new GameLogger();
    //console.log(state);
    this.logger.write(state);
  };

  this.startGame();
}

module.exports = Game;
