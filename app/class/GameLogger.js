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

    };

    this.prettyResult = function (result) {

        if (this.state.round.result === -1) {
            return 'Tie';
        } else {
            if (this.state.round.result) {
                return 'User win';
            } else {
                return 'Computer win';
            }
        }

    };

    this.printGame = function (content) {
        var gameNode = this.logNodes.game;

        if (content.game)           gameNode.innerHTML += `<h3>Game: ${content.game}</h3>`;
        if (content.round)          gameNode.innerHTML += `<h4>Round ${content.round}</h4>`;
        if (content.roundsToPlay)   gameNode.innerHTML += `<p>Rounds to play: ${content.roundsToPlay}</p>`;
        if (content.roundsPlayed)   gameNode.innerHTML += `<p>Rounds played: ${content.roundsPlayed}</p>`;

    };

    this.printRound = function (content) {
        this.logNodes.round.innerHTML = `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
                           <h2>User choice: ${content.userChoice}</h2><br>
                           <h2>Computer choice: ${content.computerChoice}</h2><br>
                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
                           <h3>Result: ${content.result}</h3><br>`;
    };

    this.printScore = function (content) {
        var scoreNode = this.logNodes.score;

        scoreNode.innerHTML = `<table class="table table-score"><thead><tr><td colspan="2">${content.title}</td></tr></thead><tbody>`;

        if (content.user) scoreNode.innerHTML += `<tr><td>User:</td><td>${state.user}</td></tr>`;
        if (content.computer) scoreNode.innerHTML += `<tr><td>Computer:</td><td>${state.computer}</td></tr>`;
        if (content.tie) scoreNode.innerHTML += `<tr><td>Tie:</td><td>${state.tie}</td></tr>`;

        scoreNode.innerHTML += `</tbody></table>`;
    };

    this.clear = function (node) {
        if (typeof node === 'undefined' || node === 'all') {
            _forEach(this.logNodes, function (el) {
                el.innerHTML = '';
            });
        } else if (typeof node === 'string' && this.logNodes[node]) {
            this.logNodes[node].innerHTML = '';
        } else if (Array.isArray(node)) {
            node.forEach(function(el){
               if (this.logNodes[el]) {
                   this.logNodes[el].innerHTML = '';
               }
            }.bind(this));
        }
    };

    this.init();

}

module.exports = GameLogger;
