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


// Play game with keydown events
document.body.addEventListener('keydown', (event) => {
    const buttonPress = event.key
    if (buttonPress === 'r') {
        playGame('rock');
    } else if (buttonPress === 'p') {
        playGame('paper');
    } else if (buttonPress === 's') {
        playGame('scissors');
    }
})


// Play game with click events
document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
})

document.querySelector('.reset-button').addEventListener('click', () => {
    scoreTracker.played = 0;
    scoreTracker.wins = 0; 
    scoreTracker.losses = 0; 
    scoreTracker.ties = 0; 
    result = '';
    localStorage.removeItem('localScoreTracker');
    updateScore();
})

document.querySelector('.autoplay-button').addEventListener('click', () => {
    autoPlay();
})


// Configuration for autoplay
let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const randomMove = pickRandomMove();
            playGame(randomMove)
        }, 2000)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}


function pickRandomMove() {
    return possibleChoices[Math.floor(Math.random()*possibleChoices.length)]
}

function playGame(playerMove) {
    const compMove = pickRandomMove();
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
