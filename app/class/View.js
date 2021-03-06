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
        return this.choiceButtons.map(function (el) {
            var node = createElement('button', {
                className: 'btn btn-lg btn-warning',
                style: 'text-transform:uppercase;margin:0 5px;'
            });
            var attr = document.createAttribute('data-choice');
            attr.value = el;

            node.setAttributeNode(attr);
            node.innerHTML = el;
            return node;
        })
    };

    this.showPlayButtons = function (show) {
        this.state.viewInit = show;
        if (show) {
            addClass(this.ui.startGameWrapper, 'hide');
            removeClass(this.ui.choiceButtonsWrapper, 'hide');
        } else {
            removeClass(this.ui.startGameWrapper, 'hide');
            addClass(this.ui.choiceButtonsWrapper, 'hide');
        }
    };

    this.update = function () {
        var appState = this.app.state;
        var state = this.state;
        if (appState.gameStarted) {
            if (!state.viewInit) this.showPlayButtons(true);
        } else {
            if (state.viewInit) this.showPlayButtons(false);
        }
        this.logger.write(appState);

    };
}


module.exports = View;
