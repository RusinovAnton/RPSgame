/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);

	var startButton = document.getElementById('startButton');
	var startGame = document.getElementById('startGame');
	var choiceButtons = document.getElementById('choiceButtons');

	startGame.addEventListener('click', function () {
	  var rounds = prompt('How many rounds?');
	  window.newGame = new Game(parseInt(rounds));
	});

	choiceButtons.addEventListener('click', function (e) {
	  var target = e.target;
	  if (target.className.match(/btn-choice/)) {
	    newGame.playRound(target.dataset.choice);
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var removeClass = __webpack_require__(3);
	var addClass = __webpack_require__(4);

	var GameLogger = __webpack_require__(5);

	/**
	 * @param rounds - amount of rounds to play;
	 * @constructor RPS game start;
	 */
	function Game(rounds) {

	  function GameState() {
	    this.gameStarted = false;
	    this.rounds = rounds || 3;
	    this.result = '';
	    this.userChoice = '';
	    this.computerChoice = '';
	    this.roundsPlayed = 0;
	    this.userScore = 0;
	    this.computerScore = 0;
	    this.tieScore = 0;
	  }

	  this.state = new GameState();

	  this.startGame = function () {
	    this.state.gameStarted = true;
	    // Hide start button
	    addClass(startButton, 'hide');
	    // Show choice buttons
	    removeClass(choiceButtons, 'hide');

	    this.updateLog(this.state);
	  };

	  this.endGame = function () {
	    this.gameStarted = false;
	    // Show start button
	    removeClass(startButton, 'hide');
	    // Hide choice buttons
	    addClass(choiceButtons, 'hide');
	  };

	  this.playRound = function (userChoice) {
	    this.state.userChoice = userChoice;
	    this.state.computerChoice = this.getComputerChoice();
	    this.state.result = this.compareChoices(this.state.userChoice, this.state.computerChoice);
	    this.state.roundsPlayed++;

	    if (this.state.result !== -1) {
	      if (this.state.result) {
	        this.state.userScore++;
	        this.state.result = 'User wins!';
	      }
	      else {
	        this.state.computerScore++;
	        this.state.result = 'Computah wins!';
	      }
	    } else {
	      this.state.rounds++;
	      this.state.tieScore++;
	      this.state.result = 'Tie';
	    }

	    this.updateLog(this.state);

	  };

	  this.getComputerChoice = function () {
	    var computerChoice = Math.random();
	    if (computerChoice < 0.34) {
	      return "rock";
	    } else if (computerChoice <= 0.67) {
	      return "paper";
	    } else {
	      return "scissors";
	    }
	  };

	  /**
	   * Comparing choices of computer and user
	   * @param userChoice
	   * @param computerChoice
	   * @returns bool -  true=user wins; false=computer wins; -1=tie;
	   */
	  this.compareChoices = function (userChoice, computerChoice) {
	    if (userChoice === computerChoice) {
	      return -1;
	    } else if (userChoice === "rock") {
	      if (computerChoice === "scissors") {
	        return true;
	      } else {
	        return false;
	      }
	    } else if (userChoice === "paper") {
	      if (computerChoice === "rock") {
	        return true;
	      } else {
	        return false;
	      }
	    } else if (userChoice === "scissors") {
	      if (computerChoice === "paper") {
	        return true;
	      } else {
	        return false;
	      }
	    } else {
	      throw new Error('Unacceptable answer');
	    }
	  };

	  this.updateLog = function (state) {
	    this.logger = this.logger || new GameLogger();
	    //console.log(state);
	    this.logger.write(state);
	  };

	  this.startGame();
	}

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(el, className){
	  if (el.classList) el.classList.remove(className);
	  else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(el, className){
	  if (el.classList) el.classList.add(className);
	  else el.className += ' ' + className;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var nodeListEach = __webpack_require__(6);

	function GameLogger(node) {
	  var _this = this;
	  this.logNode = node || document.getElementById('log');
	  this.logNodes = {};
	  this.write = function (state) {
	    this.logNode.innerHTML = `
	      <h4>Round ${state.roundsPlayed + 1}</h4>
	      <p>Rounds to play: ${state.rounds - state.roundsPlayed}</p>
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
	      <h2>User choice: ${state.userChoice}<br></h2>
	      <h2>Computer choice: ${state.computerChoice}<br></h2>
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>
	      <h3>Result: ${state.result}<br></h3>
	      =====================================<br>
	      <table class="table table-stripped">
	      <thead><th><td colspan="2">SCORE:</td></th></thead>
	      <tr>
	        <td>User:</td><td>${state.userScore}</td>
	      </tr>
	      <tr>
	        <td>Computer: </td><td>${state.computerScore}</td>
	      </tr>
	      <tr>
	        <td>Tie:</td><td>${state.tieScore}</td>
	      </tr>
	      </table>`;

	    if (state.gameResult) this.logNode.innerHTML += `${state.gameResult}`;
	  };
	  this.writeRound = function (state) {
	  };
	  this.writeScore = function (state) {

	  };
	  this.writeResult = function (state) {
	  };

	  this.init = function () {
	    var logNodes = ['round', 'game', 'score', 'result'];

	    function setLognodes(arr) {
	      arr.forEach(function (el) {
	        _this.logNode.innerHTML += `'<div class="log--${el}"></div>'`;
	      });
	      getLognodes(logNodes, _this.logNode.children);
	    }

	    function getLognodes(arr, logNodeChildren) {
	      arr.forEach(function (element) {
	        nodeListEach(logNodeChildren, function (el) {
	          if (el.className.indexOf(element) !== -1) {
	            _this.logNodes[element + 'Node'] = el;
	          }
	        });
	      })
	    }

	    setLognodes(logNodes);

	    console.log(this.logNodes);

	  };

	  this.clear = function () {
	    this.logNode.innerHTML = '';
	  };

	  this.init();
	}

	module.exports = GameLogger;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(list, cb){
	  [].forEach.call(list, cb);
	};


/***/ }
/******/ ]);