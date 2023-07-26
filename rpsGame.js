const possibleChoices = ['rock', 'paper', 'scissors']
let result = ''

let scoreTracker = JSON.parse(localStorage.getItem('localScoreTracker')) || {
    played: 0,
    wins: 0,
    losses: 0,
    ties: 0
};    

// Display Score
updateScore();


function checkWin (playerMove) {
    const compMove = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    if (playerMove === compMove){
        result = `It\'s a tie!`
        scoreTracker.played++
        scoreTracker.ties++
    } else if ((playerMove === 'rock' && compMove === 'scissors') || (playerMove === 'paper' && compMove === 'rock') || (playerMove === 'scissors' && compMove === 'paper')) {
        result = `You WIN!`
        scoreTracker.played++
        scoreTracker.wins++
    } else {
        result = `AI WINS!`
        scoreTracker.played++
        scoreTracker.losses++
    }

    localStorage.setItem('localScoreTracker', JSON.stringify(scoreTracker))

    // Update Score
    updateScore();

    updateResult(compMove, playerMove);
}

function updateScore(){
    document.querySelector('.js-score').innerText = `Played: ${scoreTracker.played} Wins: ${scoreTracker.wins} Lost: ${scoreTracker.losses} Ties: ${scoreTracker.ties}`
}

function updateResult(compMove, playerMove) {
    document.querySelector('.js-result').innerHTML = result
    document.querySelector('.js-moves').innerHTML = `You <img src="rpsImages/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"> <img src="rpsImages/${compMove}-emoji.png" alt="${compMove}" class="move-icon"> AI`
}