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