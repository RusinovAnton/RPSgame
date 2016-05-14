var Game = require('./Game');
var View = require('./View');

function App(appNode) {
    this.appNode = appNode || document.getElementById('app');
    this.app = {
        ui: {},
        state: {}
    };
}

App.prototype.handlers = {
    startGameHandler: function (e) {
        this.game.startGame();
    },
    choiceButtonsHandler: function (e) {
        this.game.playRound(e.target.dataset.choice);
    }
};

App.prototype.initHandlers = function () {

    this.app.ui.startGame.addEventListener('click', this.handlers.startGameHandler.bind(this));
    this.app.ui.choiceButtonsWrapper.addEventListener('click', this.handlers.choiceButtonsHandler.bind(this));

};


App.prototype.init = function () {

    console.log('## App init ##');

    this.game.init();
    this.view.init();
    this.initHandlers();

};

module.exports = App;
