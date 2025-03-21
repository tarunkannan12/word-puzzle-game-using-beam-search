const words = [
    { scrambled: "NAOGM", original: "MANGO", hint: "A tropical fruit that is sweet and juicy." },
    { scrambled: "PAELP", original: "APPLE", hint: "An apple a day keeps the doctor away." },
    { scrambled: "CAHEP", original: "PEACH", hint: "A fuzzy-skinned fruit that is sweet and juicy." },
    { scrambled: "NABNAA", original: "BANANA", hint: "This fruit is high in potassium and often eaten by athletes." },
    { scrambled: "RHCYER", original: "CHERRY", hint: "A small red fruit often found on cakes and desserts." }
];

let player1 = { name: "", score: 0, questions: [] };
let player2 = { name: "", score: 0, questions: [] };
let currentPlayer;
let round = 1;
let timer;
let timeLeft = 60;

function startGame() {
    player1.name = document.getElementById("player1-name").value || "Player 1";
    player2.name = document.getElementById("player2-name").value || "Player 2";
    currentPlayer = player1;

    // Assign 5 unique questions per player
    player1.questions = getRandomQuestions();
    player2.questions = getRandomQuestions();

    document.getElementById("login-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    startNewRound();
}

function getRandomQuestions() {
    let shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Select 5 unique questions
}

function startNewRound() {
    if (round > 5) {
        switchPlayer();
        return;
    }

    clearInterval(timer);
    timeLeft = 60;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    document.getElementById("score").innerText = `${currentPlayer.name}'s Score: ${currentPlayer.score}`;

    let selectedWord = currentPlayer.questions[round - 1]; // Get the current round's word
    document.getElementById("scrambled-word").innerText = `Scrambled Word: ${selectedWord.scrambled}`;
    document.getElementById("hint").innerText = "Hint: " + selectedWord.hint;
    document.getElementById("player-input").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("current-player").innerText = `Turn: ${currentPlayer.name}`;

    timer = setInterval(countdown, 1000);
}

function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("result").innerText = "⏳ Time's up! Moving to next round...";
        setTimeout(nextRound, 2000);
    }
}

function checkPlayerGuess() {
    let playerGuess = document.getElementById("player-input").value.toUpperCase();
    let selectedWord = currentPlayer.questions[round - 1];

    if (playerGuess === selectedWord.original) {
        clearInterval(timer);
        currentPlayer.score += 10;
        document.getElementById("score").innerText = `${currentPlayer.name}'s Score: ${currentPlayer.score}`;
        document.getElementById("result").innerText = "✅ Correct! +10 Points!";
    } else {
        document.getElementById("result").innerText = "❌ Wrong! Moving to next word...";
    }

    setTimeout(nextRound, 2000);
}

function nextRound() {
    round++;
    if (round <= 5) {
        startNewRound();
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        round = 1;
        document.getElementById("result").innerText = `${player1.name} finished! Now it's ${player2.name}'s turn.`;
        setTimeout(startNewRound, 3000);
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("winner-container").style.display = "block";

    let winner;
    if (player1.score > player2.score) {
        winner = `${player1.name} Wins! 🎉`;
    } else if (player2.score > player1.score) {
        winner = `${player2.name} Wins! 🎉`;
    } else {
        winner = "It's a Tie!";
    }

    document.getElementById("winner-message").innerText = `Game Over! ${winner}`;
}

function restartGame() {
    location.reload();
}
