var createElement = require('../utils/createElement');
var _forEach = require('lodash.foreach');

function GameLogger(node) {

    var _this = this;
    this.logNode = node || document.getElementById('log');
    this.logNodes = {};

    this.init = function (logNodesArr) {
        console.log('## GameLogger initialization ##');

        this.clear();

        var logNodes = logNodesArr || ['game', 'round', 'score', 'result'];

        function setLognodes(arr) {
            arr.forEach(function (el) {
                var logElement = createElement('div', {className: 'log--' + el});
                _this.logNode.appendChild(logElement);
                _this.logNodes[el] = logElement;
            });
        }

        setLognodes(logNodes);

    };

    this.write = function (state) {
        this.clear();
        if (state.gameStarted) {
            this.printGame({
                game: state.game.gamesPlayed + 1,
                round: state.roundsPlayed + 1,
                roundsToPlay: state.rounds - state.roundsPlayed
            });
            if (state.roundsPlayed) {
                this.printRound({
                    userChoice: state.round.userChoice,
                    computerChoice: state.round.computerChoice,
                    result: this.prettyResult(state.round.result)
                });
                this.printScore({
                    title: 'Current game score',
                    user: state.round.score.user,
                    computer: state.round.score.computer,
                    tie: state.round.score.tie
                })
            }
        } else {
            if (state.game.gamesPlayed) {
                this.printGame({
                    game: state.game.gamesPlayed,
                    gameOver: true
                });
                this.printScore({
                    title: 'Total score',
                    user: state.game.score.user,
                    computer: state.game.score.computer
                })
            }
        }
    };

    this.prettyResult = function (result) {

        if (result === -1) {
            return 'Tie';
        } else {
            if (result) {
                return 'User win';
            } else {
                return 'Computer win';
            }
        }

    };

    this.printGame = function (state) {
        var gameNode = this.logNodes.game;
        this.clear('game');
        if (state.game)           gameNode.innerHTML += `<h3>Game: ${state.game}</h3>`;
        if (!state.gameOver) {
            if (state.round)          gameNode.innerHTML += `<h4>Round ${state.round}</h4>`;
            if (state.roundsToPlay)   gameNode.innerHTML += `<p>Rounds to play: ${state.roundsToPlay}</p>`;
            if (state.roundsPlayed)   gameNode.innerHTML += `<p>Rounds played: ${state.roundsPlayed}</p>`;
        } else {
            gameNode.innerHTML += `<h3>is over</h3>`;
        }
    };

    this.printRound = function (state) {
        this.logNodes.round.innerHTML =
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>
            <h3>User choice:</h3><br><h2 style="color: #fc0000">${state.userChoice}</h2><br>
            <h3>Computer choice: </h3><br><h2 style="color: #fc0000">${state.computerChoice}</h2><br>
            <h3>Result: ${state.result}</h3><br>
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>`;
    };

    this.printScore = function (state) {
        var scoreNode = this.logNodes.score;
        this.clear('score');

        scoreNode.innerHTML = `
        <table class="table table-score">
            <thead><tr><td colspan="2">${state.title}</td></tr></thead>
            <tbody>
                <tr><td>User:</td><td>${state.user}</td></tr>
                <tr><td>Computer:</td><td>${state.computer}</td></tr>
                <tr><td>Tie:</td><td>${state.tie}</td></tr>
            </tbody>
        </table>`;
    };

    this.clear = function (node) {
        console.log(typeof node);
        if (typeof node === 'undefined' || node === 'all') {
            _forEach(this.logNodes, function (el) {
                el.innerHTML = '';
            });
        } else if (typeof node === 'string' && this.logNodes[node]) {
            this.logNodes[node].innerHTML = '';
        } else if (Array.isArray(node)) {
            node.forEach(function (el) {
                if (this.logNodes[el]) {
                    this.logNodes[el].innerHTML = '';
                }
            }.bind(this));
        }
    };

    this.init();

}

module.exports = GameLogger;
