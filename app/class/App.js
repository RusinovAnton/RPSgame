var Game = require('./Game');

function App(appNode) {





    this.UI.startGame.addEventListener('click', function () {

        var rounds = prompt('How many rounds?') || false;
        RPSgame.startGame(rounds);

    });

    this.UI.choiceButtons.addEventListener('click', function (e) {

        var target = e.target;
        if (hasClass(target)) {
            RPSgame.playRound(target.dataset.choice);
        }

    });

    this.init(appNode);
}

App.prototype.init = function(){
    this.appNode = appNode || document.getElementById('app');

    this.UI = new View(this.appNode);
    this.game = new Game(this.UI);
};

module.exports = App;
