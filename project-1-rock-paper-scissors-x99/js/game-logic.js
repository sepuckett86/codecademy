let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {

  // Check if moves have been set
  if (moveOneType === undefined || moveTwoType === undefined || moveThreeType === undefined) {
    return "Error, not all types set."
  }

  // Check if values have been set
  if (moveOneValue === undefined || moveTwoValue === undefined || moveThreeValue === undefined) {
    return "Error, not all values set."
  }

  // Check if move types are valid
  let moveCheckOne = false;
  let moveCheckTwo = false;
  let moveCheckThree = false;
  const validMoveTypes = ['rock', 'paper', 'scissors'];
  for (let i = 0; i < validMoveTypes.length; i++) {
    if (validMoveTypes[i] === moveOneType) {
      moveCheckOne = true;
    }
    if (validMoveTypes[i] === moveTwoType) {
      moveCheckTwo = true;
    }
    if (validMoveTypes[i] === moveThreeType) {
      moveCheckThree = true;
    }
  }
  if (moveCheckOne === false || moveCheckTwo === false || moveCheckThree === false) {
    return "Error, not all move types are valid."
  }

  // Check if values are less than one
  if (moveOneValue < 1 || moveTwoValue < 1 || moveThreeValue < 1) {
    return "Error, not all values are less than one."
  }

  // Set player moves
  if (player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveThreeValue = moveThreeValue;
  }
  else if (player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveThreeValue = moveThreeValue;
  }
}

function getRoundWinner(round) {

  switch(round) {
    case 1:
      if (playerOneMoveOneType === playerTwoMoveOneType) {
        if (playerOneMoveValue === playerTwoMoveValue) {
          return "Tie";
        }
        if (playerOneMoveValue > playerTwoMoveValue) {
          return "Player One";
        }
        if (playerOneMoveValue < playerTwoMoveValue) {
          return "Player Two";
        }
      }
      if (playerOneMoveOneType !== playerTwoMoveOneType) {
        if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'paper') {
          return "Player Two";
        }
        if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'scissors') {
          return "Player One";
        }
        if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'rock') {
          return "Player One";
        }
        if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'scissors') {
          return "Player Two";
        }
        if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'paper') {
          return "Player One";
        }
        if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'rock') {
          return "Player Two";
        }
      }
    break;
    case 2:
    break;
    case 3:
    break;
    default:
    console.log("Error. Please enter round number");
    }
  }
