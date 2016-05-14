var nodeListEach = require('../utils/nodeListEach');
var _forEach = require('lodash.foreach');

function GameLogger(node) {

    var _this = this;
    this.logNode = node || document.getElementById('log');
    this.logNodes = {};

    this.init = function () {
        console.log('## GameLogger initialization ##');

        this.clear();
        var logNodes = ['round', 'game', 'score', 'result'];

        function setLognodes(arr) {
            arr.forEach(function (el) {
                _this.logNode.innerHTML += `<div class="log--${el}"></div>`;
            });
            getLognodes(logNodes, _this.logNode.children);
        }

        function getLognodes(arr, logNodeChildren) {
            arr.forEach(function (element) {
                nodeListEach(logNodeChildren, function (el) {
                    if (el.className.indexOf(element) !== -1) {
                        _this.logNodes[element + 'Node'] = el;
                    }
                });
            })
        }

        setLognodes(logNodes);
    };

    this.write = function (state) {
        this.state = state;
        console.log(this);
        this.writeGame();
        this.writeScore();
    };

    this.writeRound = function (state) {
        this.logNodes.roundNode.innerHTML =
            `<h3>Game: ${state.gamesPlayed + 1}</h3>
      <h4>Round ${state.roundsPlayed + 1}</h4>
      <p>Rounds to play: ${state.rounds - state.roundsPlayed}</p>`;
    };
    this.writeGame = function (state) {
        state = state.round || this.state.round;
        this.logNodes.gameNode.innerHTML = `
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
      <h2>User choice: ${state.userChoice}<br></h2>
      <h2>Computer choice: ${state.computerChoice}<br></h2>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
      <h3>Result: ${state.result}<br></h3>
      =====================================<br>`;
    };
    this.writeScore = function (state) {
        state = state.score || this.state.score;
        this.logNodes.scoreNode.innerHTML =
            `<table class="table table-stripped">
          <thead><th><td colspan="2">SCORE:</td></th></thead>
          <tbody>
            <tr>
              <td>User:</td><td>${state.user}</td>
            </tr>
            <tr>
              <td>Computer: </td><td>${state.enemy}</td>
            </tr>
            <tr>
              <td>Tie:</td><td>${state.tie}</td>
            </tr>
          </tbody>
        </table>`;
    };
    this.writeResult = function (state) {
        this.clear();
        this.logNodes.resultNode.innerHTML = `
      <h3>Game is over</h3>
      <h4>${state.resultMessage}</h4>
    `;
    };
    this.clear = function () {
        _forEach(this.logNodes, function (el) {
            el.innerHTML = '';
        })
    };

    this.init();

}

module.exports = GameLogger;
