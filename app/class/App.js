var Game = require('./Game');
var View = require('./View');

function App(appNode) {
    this.appNode = appNode || document.getElementById('app');
    this.app = {
        ui: {},
        state: {}
    };
}

App.prototype.init = function(){
    console.log('## App init ##');
    this.game.init();
    this.view.init();
    this.game.startGame(0);
};

module.exports = App;
