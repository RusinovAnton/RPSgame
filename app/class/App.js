var Game = require('./Game');
var View = require('./View');

function App(appNode) {
    this.init(appNode);
}

App.prototype.init = function(){
    this.appNode = appNode || document.getElementById('app');

    this.game = new Game();
    this.view = new View(this.appNode);

};

module.exports = App;

