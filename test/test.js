require('./dummyDOM')();
var assert = require('chai').assert;
var GameLogger = require('../app/class/GameLogger');
var Logger = new GameLogger('test');

describe('GameLogger class', function() {
    describe('pretty result', function () {
        it('should return "Tie" when argument is -1', function () {
            assert.equal('Tie', Logger.prettyResult(-1));
        });
    });
});
