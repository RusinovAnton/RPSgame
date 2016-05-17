var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');
var GameLogger = require('../app/class/GameLogger');
var Logger = new GameLogger('test');

describe('GameLogger class', function() {

    global.document = jsdom({html: '../dist/index.html'});

    describe('pretty result', function () {
        before(function(){
            GameLogger = require('../app/class/GameLogger');
        });
        it('should return "Tie" when argument is -1', function () {
            assert.equal('Tie', Logger.prettyResult(-1));
        });
        it('should return "User win" when argument is true', function(){
            assert.equal('User win', Logger.prettyResult(true));
        });
        it('should return "Computer win" when argument is false', function(){
            assert.equal('Computer win', Logger.prettyResult(false));
        });
    });
});
