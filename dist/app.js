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
	  window.newGame = new Game(rounds);
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
	    this.result = '';
	    this.userChoice = '';
	    this.computerChoice = '';
	    this.roundsPlayed = 0;
	    this.userScore = 0;
	    this.computerScore = 0;
	    this.tieScore = 0;
	  }

	  this.rounds = rounds || 0;

	  this.state = new GameState();

	  this.startGame = function () {
	    this.state.gameStarted = true;

	    // Hide start button
	    addClass(startButton, 'hide');
	    // Show choice buttons
	    removeClass(choiceButtons, 'hide');

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

	    if (this.state.result !== -1) {
	      this.state.roundsPlayed++;
	      if (this.state.result) this.state.userScore++;
	      else this.state.computerScore++;
	    } else this.state.tieScore++;

	    this.updateLog(this.state);
	  };

	  this.getComputerChoice = function () {
	    var computerChoice = Math.random();
	    if (computerChoice < 0.34) {
	      return "rock";
	    } else if (computerChoice <= 0.67) {
	      computerChoice = "paper";
	    } else {
	      computerChoice = "scissors";
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

	  this.updateLog = function(state){
	    this.logger = this.logger || new GameLogger();
	    console.log(state);
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
/***/ function(module, exports) {

	function GameLogger(node){
	  this.logNode = node || document.getElementById('#log');
	  console.log(node);
	  this.write = function(state){
	    this.logNode.innerHTML =
	      `Rounds played: ${state.roundsPlayed}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	      User choice: ${state.userChoice}
	      Computer choice: ${state.computerChoice}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	      Result: ${state.result}
	      =====================================
	      SCORE:
	      User: ${state.userScore}
	      Computer: ${state.computerScore}
	      Tie: ${state.tieScore}

	      `;

	    if (state.gameResult) this.logNode.innerHTML += `${state.gameResult}`;
	  };

	  this.clear = function(){
	    this.logNode.innerHTML = '';
	  }
	}

	module.exports = GameLogger;

/***/ }
/******/ ]);