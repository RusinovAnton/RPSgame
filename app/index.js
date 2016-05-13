var App = require('./class/App');
var Game = require('./class/Game');
var View = require('./class/View');

var app = new App(document.getElementById('app'));

Game.prototype = app;
View.prototype = app;

app.game = new Game();
app.view = new View();

app.init();

window.apperino = app;
