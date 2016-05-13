var addClass = require('../utils/addClass');
var removeClass = require('../utils/removeClass');
var createElement = require('../utils/createElement');

var GameLogger = require('./GameLogger');
var ViewState = require('./ViewState');

function View() {
    this.choiceButtons = this.game.choiceButtons || [];
    this.ui = this.app.ui || {};

    this.init = function () {
        console.log('## View initialization ##');
        this.state = new ViewState();
        this.buildView();
        this.logger = new GameLogger(this.ui.logNode);
    };

    this.buildView = function () {

        var panelGroup = createElement('div', {className: 'panel-group text-center'});
        var startButtonWrapper = createElement('div', {className: 'panel-body', id: 'startButton'});
        var choiceButtonsWrapper = createElement('div', {className: 'panel-body hide', id: 'choiceButton'});
        var log = createElement('div', {className: 'panel-body', id: 'log'});
        var gameStartButton = createElement('button', {className: 'btn btn-danger', id: 'startGame'}, 'Begin battle');
        var choiceButtons = this.setChoiceButtons();

        startButtonWrapper.appendChild(gameStartButton);

        choiceButtons.forEach(function (el) {
            choiceButtonsWrapper.appendChild(el);
        });

        panelGroup.appendChild(startButtonWrapper);
        panelGroup.appendChild(choiceButtonsWrapper);
        panelGroup.appendChild(log);

        this.appNode.appendChild(panelGroup);

        this.ui.appBody = panelGroup;
        this.ui.startGame = gameStartButton;
        this.ui.startGameWrapper = startButtonWrapper;
        this.ui.choiceButtonsWrapper = choiceButtonsWrapper;
        this.ui.logNode = log;

    };

    this.setChoiceButtons = function () {
        var choiceButton = createElement('button', {
            className: 'btn btn-lg btn-warning',
            style: 'text-transform:uppercase;margin:0 5px;'
        });

        var dataChoice = document.createAttribute('data-choice');

        return this.choiceButtons.map(function (el) {
            var node = choiceButton.cloneNode();
            var attr = dataChoice.cloneNode();
            attr.value = el;

            node.setAttributeNode(attr);
            node.innerHTML = el;
            return node;
        })
    };

    this.showPlayButtons = function (show) {
        this.viewInit = show;
        if (show) {
            addClass(this.ui.startGameWrapper, 'hide');
            removeClass(this.ui.choiceButtonsWrapper, 'hide');
        } else {
            removeClass(this.ui.startGameWrapper, 'hide');
            hideClass(this.ui.choiceButtonsWrapper, 'hide');
        }
    };

    this.update = function () {
        console.log(this.app.state);
       /* if (state.gameStarted && !this.viewInit) {
            this.showPlayButtons(true);

        } else if (!state.gameStarted && this.viewInit) {
            this.showPlayButtons(false);
        }*/

    };
}


module.exports = View;
