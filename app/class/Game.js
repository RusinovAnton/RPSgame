var GameState = require('./GameState');

/**
 * @constructor RPS game start;
 */
function Game() {
    this.choiceButtons = ['rock', 'paper', 'scissors'];

    this.init = function () {
        console.log('## Game Initialization ##');
    };

    this.startGame = function (rounds) {

        console.log('## Game start ##');

        this.app.state = new GameState(this.app.state.gamesPlayed, parseInt(rounds));
        this.app.state.gameStarted = true;

        this.view.update();

    };

    this.playRound = function (userChoice) {

        if (this.app.state.rounds - this.app.state.roundsPlayed) {
            this.app.state.round.userChoice = userChoice;
            this.app.state.round.computerChoice = this.getComputerChoice();
            this.app.state.round.result = this.compareChoices(this.app.state.round.userChoice, this.app.state.round.computerChoice);
            this.app.state.roundsPlayed++;

            if (this.app.state.result !== -1) {
                if (this.app.state.result) {
                    this.app.state.score.user++;
                }
                else {
                    this.app.state.score.enemy++;
                }
            } else {
                this.app.state.rounds++;
                this.app.state.score.tie++;
            }
        } else {
            this.endGame();
        }

        this.view.update();

    };

    this.endGame = function () {
        console.log('## Game end ##');

        this.app.state.gameStarted = false;
        this.app.state.gamesPlayed++;

        this.view.update();
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
