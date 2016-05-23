/**
 *
 * @param { Number } gamesPlayed
 * @param { Number } rounds
 * @returns {{gameStarted: boolean, gamesPlayed: (*|number), rounds: (*|number), roundsPlayed: number, round: {result: string, userChoice: string, computerChoice: string}, score: {user: number, computer: number, tie: number}}}
 * @constructor - initial game state
 */

function GameState(game, rounds) {
    return {

        gameStarted: false,
        rounds: rounds || 3,
        roundsPlayed: 0,
        game: game || {
            gamesPlayed: 0,
            result: '',
            score: {
                user: 0,
                computer: 0,
                tie: 0
            }
        },
        round: {
            result: '',
            userChoice: '',
            computerChoice: '',
            score: {
                user: 0,
                computer: 0,
                tie: 0
            }

        }
    }
}

module.exports = GameState;
