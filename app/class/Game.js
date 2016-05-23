var GameState = require('./GameState');

/**
 * @constructor RPS game;
 */
function Game() {
    this.choiceButtons = ['rock', 'paper', 'scissors'];

    this.init = function () {
        console.log('## Game Initialization ##');
    };

    this.startGame = function (rounds) {

        console.log('## Game start ##');

        this.app.state = new GameState(this.app.state.game || this.app.state.game, parseInt(rounds));
        this.app.state.gameStarted = true;

        this.view.update();

    };

    this.playRound = function (userChoice) {

        this.app.state.roundsPlayed++;

        if (this.app.state.rounds - this.app.state.roundsPlayed > 0) {
            this.proceed(userChoice);
        } else {
            this.endGame();
        }

    };

    this.proceed = function(userChoice) {
        this.app.state.round.userChoice = userChoice;
        this.app.state.round.computerChoice = this.getComputerChoice();
        this.app.state.round.result = this.compareChoices(this.app.state.round.userChoice, this.app.state.round.computerChoice);

        if (this.app.state.round.result !== -1) {
            if (this.app.state.round.result) {
                this.setScore('user');
            }
            else {
                this.setScore('computer');
            }
        } else {
            this.app.state.rounds++;
            this.setScore('tie');
        }
        this.view.update();
    };

    this.endGame = function () {
        console.log('## Game end ##');

        this.app.state.gameStarted = false;
        this.app.state.game.gamesPlayed++;

        this.view.update();
    };

    this.setScore = function(score){
        this.app.state.round.score[score]++;
        this.app.state.game.score[score]++;
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

}


module.exports = Game;
