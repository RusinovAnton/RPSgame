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

    this.endGame = function () {
        console.log('## Game end ##');

        this.state.gameStarted = false;
        this.state.gamesPlayed++;

        this.view.update(this.state);
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
