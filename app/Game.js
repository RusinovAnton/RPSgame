var GameState = require('./GameState');
var View = require('./View.js');

/**
 * @constructor RPS game start;
 */
function Game() {
  this.init();
}

Game.prototype.init = function () {

  this.view = new View();
  this.state = {};

};

Game.prototype.startGame = function (rounds) {

  console.log('## Game initialization ##');

  this.state = new GameState(this.state.gamesPlayed, parseInt(rounds));
  this.state.gameStarted = true;
  this.view.update(this.state);

};

Game.prototype.playRound = function (userChoice) {
  console.log(this.state);

  if (this.state.rounds - this.state.roundsPlayed) {
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
  } else {
    this.endGame();
  }

  this.view.update(this.state);

};

Game.prototype.endGame = function () {
  this.state.gameStarted = false;
  this.state.gamesPlayed++;

  this.view.update(this.state);
};

Game.prototype.getComputerChoice = function () {
  var computerChoice = Math.random();
  if (computerChoice < 0.34) {
    return "rock";
  } else if (computerChoice <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
};
Game.prototype.compareChoices = function (userChoice, computerChoice) {
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
Game.prototype.setResultMessage = function () {
  var resultMessage;
  if (this.state.userScore > this.state.computerScore) {
    resultMessage = 'User wins!';
  } else if (this.state.userScore < this.state.computerScore) {
    resultMessage = 'Computer wins!';
  } else {
    resultMessage = 'Result is tie!';
  }
  this.state.resultMessage = resultMessage;
};

module.exports = Game;
