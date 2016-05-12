var addClass = require('./utils/addClass');
var removeClass = require('./utils/removeClass');

var GameLogger = require('./GameLogger');

function View() {
  this.init();
}

View.prototype.init = function () {
  console.log('## View initialization ##');
  this.logger = this.logger || new GameLogger();
  this.viewInit = false;
};

View.prototype.update = function(state){
  if (state.gameStarted && !this.viewInit) {
    this.showPlayButtons(true);

  } else if (!state.gameStarted && this.viewInit){
    this.showPlayButtons(false);
  }

};

View.prototype.showPlayButtons = function(show){
  if (show) {
    addClass(RPSUI.startButton, 'hide');
    removeClass(RPSUI.choiceButtons, 'hide');
  } else {
    addClass(RPSUI.choiceButtons, 'hide');
    removeClass(RPSUI.startButton, 'hide');
  }
  this.viewInit = !this.viewInit;
};

module.exports = View;