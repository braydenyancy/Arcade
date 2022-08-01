// make game board
// add player 1
// player 1 can put down an x
// player 2 can put down an o


let gameState = {};
let playerX = 'x';
let playerO = 'circle';
let playerXName
let playerOName
let turn
let currentPlayer
let checkedBoxes = [];

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessage = document.getElementById('you-win')
const restartButton = document.getElementById('restartButton')
const playAgainButton = document.getElementById('playAgain')
const startButton = document.getElementById('startGame')
const onePlayerButton = document.getElementById('onePlayer')
const twoPlayerButton = document.getElementById('twoPlayer')
const winMessageText = document.querySelector('[data-win-message-text]')
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

onePlayerButton.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('playerAmount').style.display = 'none'
    document.getElementById('playerNameStart').style.display = 'flex'
    document.getElementById('playerOLabel').style.display = 'none'
    document.getElementById('playerO').style.display = 'none'
})

twoPlayerButton.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('playerAmount').style.display = 'none'
    document.getElementById('playerNameStart').style.display = 'flex'
    document.getElementById('playerOLabel').style.display = 'flex'
    document.getElementById('playerO').style.display = 'flex'
})

restartButton.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('board').style.display = 'none'
    document.getElementById('playerAmount').style.display = 'flex'
    initialState()
})
playAgainButton.addEventListener('click', event => {
    event.preventDefault();
    initialState()
})

startButton.addEventListener('click', event => {
    event.preventDefault();
    playerXName = document.getElementById('playerX').value
    playerOName = document.getElementById('playerO').value
    document.getElementById('playerNameStart').style.display = 'none'
    document.getElementById('board').style.display = 'grid'
    initialState();
})

function initialState() {
    turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener('click', activeState)
        cell.innerHTML = ''
        cell.addEventListener('click', activeState, { once: true })
    })
    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    winningMessage.classList.remove('show')
}
function activeState(event) {
    const clickedCell = event.target
    const currentPlayer = turn ? playerO : playerX
    selection(clickedCell, currentPlayer)

    if (checkWin(currentPlayer)) {
        endGame(true)
    } else if (isDraw()) {
        endGame(false)
    } else {
        swapTurns()
    }
    if (currentPlayer === 'x' && playerOName.length < 1) {
        cpuClick()
    }
    console.log(currentPlayer)
}

function cpuClick() {
    let random = Math.floor(Math.random() * 8)
    console.log(random)
    let counter = 0;

    while (counter < 4 && document.getElementsByClassName('cell')[random].innerHTML) {
        counter++
        random = Math.floor(Math.random() * 8)
    }

    document.getElementsByClassName('cell')[random].click()
}

function selection(clickedCell, currentPlayer) {
    // place mark
    clickedCell.classList.add(currentPlayer)
    if (currentPlayer === 'circle') {
        let img = document.createElement('img');
        img.src = 'images/o.png';
        clickedCell.appendChild(img)
    }
    else {
        let imgX = document.createElement('img');
        imgX.src = 'images/x.png';
        clickedCell.appendChild(imgX)
    }
}

function checkWin(currentPlayer) {
    return winCombos.some(playerMoves => {
        return playerMoves.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

function endGame(win) {
    if (win) {
        winMessageText.innerText = `${turn ? playerOName : playerXName} Wins!`
    } else {
        winMessageText.innerText = 'Draw!'
    }
    winningMessage.classList.add('show')
    
    if ((playerOName < 1) && (currentPlayer === 'circle')) {
        winMessageText.innerText = `CPU Wins!`
    }
    console.log(currentPlayer)
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}

function swapTurns() {
    turn = !turn
}