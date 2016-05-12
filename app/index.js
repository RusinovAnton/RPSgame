var Game = require('./Game');

window.RPSUI = {
  startGame: document.getElementById('startGame'),
  startButton: document.getElementById('startButton'),
  choiceButtons: document.getElementById('choiceButtons')
};

window.RPSgame = new Game();

RPSUI.startGame.addEventListener('click', function () {

  var rounds = prompt('How many rounds?') || false;
  RPSgame.startGame(rounds);

});

RPSUI.choiceButtons.addEventListener('click', function (e) {

  var target = e.target;
  if (target.className.match(/btn-choice/)) {
    RPSgame.playRound(target.dataset.choice);
  }

});
