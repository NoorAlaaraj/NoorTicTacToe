const X_CLASS ='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]') // selecting all the cells 
const board = document.getElementById ('board')
const winningMessageElement = document.getElementById ('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-text]')

let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}
// if it is circle turn then we want return circle class
 //  otherwise we are gonna return the x class

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }

    //   remove event listener 
  cellElements.forEach.removeEventListener('click', endGame)


}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}
//  whenever I click on a cell it supposed to show 
//  an x eveytime because circle is false at this time

function swapTurns() {
  circleTurn = !circleTurn
}
//  it will take circle turn and its going to set it to the opposite
//  of circle turn, now it will be x's turn then circle's turn and so on

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}
// supposed to show hover to know which player's turn

function checkWin(currentClass) {
    console.log(`currentclass: ${currentClass} `)
    console.log(`combinations: ${WINNING_COMBINATIONS} `)
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            // if the current class is in all three of these elements inside of the combinations then we won
            console.log(cellElements[index].classList)
            return cellElements[index].classList.contains(currentClass)
    })
  })
}
       // check all the winng combinations to see if some of the 
     // winning combinations are met by the current combinations