
function GameState(gamesPlayed, rounds) {
  return {
    gameStarted: false,
    gamesPlayed: gamesPlayed || 0,
    rounds: rounds || 3,
    roundsPlayed: 0,
    result: '',
    userChoice: '',
    computerChoice: '',
    userScore: 0,
    computerScore: 0,
    tieScore: 0,
    resultMessage: ''
  }
}

module.exports = GameState;