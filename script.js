let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = 'X'; 
let gameActive = true; 
const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
]
const gameStatusDisplay = document.getElementById('gameStatus');
const gameCells = document.querySelectorAll('.cell'); 
const resetButton = document.getElementById('resetButton');
const playerTurnMessage = (player) => `It's ${player}'s turn!`;
const winMessage = (winner) => `Player ${winner} has won!`;
const drawMessage = `Game ended in a draw!`;
gameStatusDisplay.innerHTML = playerTurnMessage(currentPlayer);
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    handlePlayerMove(clickedCell, clickedCellIndex);
    checkGameResult();
}
function handlePlayerMove(cell, index) {
    gameBoard[index] = currentPlayer; 
    cell.innerHTML = currentPlayer; 
    cell.classList.add(currentPlayer.toLowerCase()); 
}
function checkGameResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i]; 
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break; 
        }
    }
    if (roundWon) {
        gameStatusDisplay.innerHTML = winMessage(currentPlayer);
        gameActive = false; 
        return;
    }
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        gameStatusDisplay.innerHTML = drawMessage;
        gameActive = false; 
        return;
    }
    handlePlayerChange();
    if (currentPlayer === 'O' && gameActive) {
        setTimeout(handleAIMove, 500); 
    }
}


function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatusDisplay.innerHTML = playerTurnMessage(currentPlayer);
}


function handleAIMove() {
    const availableCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            availableCells.push(i);
        }
    }

    
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellToPlay = availableCells[randomIndex];
        const targetCell = document.querySelector(`[data-cell-index="${cellToPlay}"]`);
        handlePlayerMove(targetCell, cellToPlay);
        checkGameResult();
    }
}

function handleResetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; 
    gameActive = true; 
    currentPlayer = 'X'; 
    
    gameCells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x', 'o');
    });

    gameStatusDisplay.innerHTML = playerTurnMessage(currentPlayer);
}


gameCells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
