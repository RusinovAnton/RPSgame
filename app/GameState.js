
function GameState(gamesPlayed, rounds) {
  return {

    gameStarted       : false,
    gamesPlayed       : gamesPlayed || 0,

    rounds            : rounds || 3,
    roundsPlayed      : 0,

    round: {
      result          : '',
      userChoice      : '',
      computerChoice  : ''
    },

    score: {
      user            : 0,
      enemy           : 0,
      tie             : 0
    }

  }
}

module.exports = GameState;