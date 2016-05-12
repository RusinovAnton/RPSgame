var nodeListEach = require('./utils/nodeListEach');

function GameLogger(node) {
  var _this = this;
  this.logNode = node || document.getElementById('log');
  this.logNodes = {};
  this.write = function (state) {
    this.logNode.innerHTML = `
      <h4>Round ${state.roundsPlayed + 1}</h4>
      <p>Rounds to play: ${state.rounds - state.roundsPlayed}</p>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
      <h2>User choice: ${state.userChoice}<br></h2>
      <h2>Computer choice: ${state.computerChoice}<br></h2>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
      <h3>Result: ${state.result}<br></h3>
      =====================================<br>
      <table class="table table-stripped">
      <thead><th><td colspan="2">SCORE:</td></th></thead>
      <tr>
        <td>User:</td><td>${state.userScore}</td>
      </tr>
      <tr>
        <td>Computer: </td><td>${state.computerScore}</td>
      </tr>
      <tr>
        <td>Tie:</td><td>${state.tieScore}</td>
      </tr>
      </table>`;

    if (state.gameResult) this.logNode.innerHTML += `${state.gameResult}`;
  };
  this.writeRound = function (state) {
  };
  this.writeScore = function (state) {

  };
  this.writeResult = function (state) {
  };

  this.init = function () {
    var logNodes = ['round', 'game', 'score', 'result'];

    function setLognodes(arr) {
      arr.forEach(function (el) {
        _this.logNode.innerHTML += `'<div class="log--${el}"></div>'`;
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

    console.log(this.logNodes);

  };

  this.clear = function () {
    this.logNode.innerHTML = '';
  };

  this.init();
}

module.exports = GameLogger;