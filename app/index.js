var Game = require('./Game');

var startButton = document.getElementById('startButton');
var startGame = document.getElementById('startGame');
var choiceButtons = document.getElementById('choiceButtons');

startGame.addEventListener('click', function () {
  var rounds = prompt('How many rounds?');
  window.newGame = new Game(parseInt(rounds));
});

choiceButtons.addEventListener('click', function (e) {
  var target = e.target;
  if (target.className.match(/btn-choice/)) {
    newGame.playRound(target.dataset.choice);
  }
});
