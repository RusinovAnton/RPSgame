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
        console.log(e);
    },
    choiceButtonsHandler: function (e) {
        console.log(e);
    }
};

App.prototype.initHandlers = function () {

    this.app.ui.startGame.addEventListener('click', this.handlers.startGameHandler);
    this.app.ui.choiceButtonsWrapper.addEventListener('click', this.handlers.choiceButtonsHandler);

};

App.prototype.init = function () {

    console.log('## App init ##');

    this.game.init();
    this.view.init();
    this.game.startGame(0);
    console.log(this.app);
    this.initHandlers();

};

module.exports = App;
