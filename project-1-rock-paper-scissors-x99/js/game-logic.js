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
    return "Error, not all values are greater than one."
  }

  // Check if values are greater than 99
  if (moveOneValue > 99 || moveTwoValue > 99 || moveThreeValue > 99) {
    return "Error, not all values are less than 99."
  }

  // Check if values sum to more than 99
  if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
    return "Error, values sum to more than 99."
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
  // Account for the round
  let playerOneType;
  let playerOneValue;
  let playerTwoType;
  let playerTwoValue;
  switch(round) {
    case 1:
      playerOneType = playerOneMoveOneType;
      playerOneValue = playerOneMoveOneValue;
      playerTwoType = playerTwoMoveOneType;
      playerTwoValue = playerTwoMoveOneValue;
      break;
    case 2:
      playerOneType = playerOneMoveTwoType;
      playerOneValue = playerOneMoveTwoValue;
      playerTwoType = playerTwoMoveTwoType;
      playerTwoValue = playerTwoMoveTwoValue;
      break;
    case 3:
      playerOneType = playerOneMoveThreeType;
      playerOneValue = playerOneMoveThreeValue;
      playerTwoType = playerTwoMoveThreeType;
      playerTwoValue = playerTwoMoveThreeValue;
      break;
    default:
      // If round does not equal 1, 2, or 3, return null
      return null
      break;
  }

  // Return null if types or values missing
  if (playerOneType === undefined || playerOneValue === undefined ||
    playerTwoType === undefined || playerTwoValue === undefined) {
      return null;
  }

  // In case of same type, determine winner
    if (playerOneType === playerTwoType) {
      if (playerOneValue === playerTwoValue) {
        return "Tie";
      }
      if (playerOneValue > playerTwoValue) {
        return "Player One";
      }
      if (playerOneValue < playerTwoValue) {
        return "Player Two";
      }
    }

  // In case of different type, determine winner
    if (playerOneType !== playerTwoType) {
      if (playerOneType === 'rock' && playerTwoType === 'paper') {
        return "Player Two";
      }
      if (playerOneType === 'rock' && playerTwoType === 'scissors') {
        return "Player One";
      }
      if (playerOneType === 'paper' && playerTwoType === 'rock') {
        return "Player One";
      }
      if (playerOneType === 'paper' && playerTwoType === 'scissors') {
        return "Player Two";
      }
      if (playerOneType === 'scissors' && playerTwoType === 'paper') {
        return "Player One";
      }
      if (playerOneType === 'scissors' && playerTwoType === 'rock') {
        return "Player Two";
      }
    }
  }

function getGameWinner() {
  const winnerArray = [getRoundWinner(1), getRoundWinner(2), getRoundWinner(3)];
  let playerOne = 0;
  let playerTwo = 0;
  let tie = 0;
  let missing = false;

  // Count up results from all rounds
  for (let i = 0; i < winnerArray.length; i++) {
    if (winnerArray[i] === 'Player One') {
      playerOne++;
    }
    if (winnerArray[i] === 'Player Two') {
      playerTwo++;
    }
    if (winnerArray[i] === 'Tie') {
      tie++;
    }
    if (winnerArray[i] === null) {
      missing = true;
    }
  }

// Return null if values are missing
  if (missing === true) {
    return null
  }

  // Determine winner
  if (playerOne > playerTwo) {
    return "Player One";
  }
  if (playerOne < playerTwo) {
    return "Player Two";
  }
  if (playerOne === playerTwo) {
    return "Tie";
  }
}

function setComputerMoves() {

  // Get array of three random types
  const validMoves = ['rock', 'paper', 'scissors'];
  let randomTypeArray = [];
  for (let i = 0; i < 3; i++) {
    let randomType = validMoves[Math.floor(Math.random() * 3)];
    randomTypeArray.push(randomType);
  }
  // Set type variables for player two
  playerTwoMoveOneType = validMoves[0];
  playerTwoMoveTwoType = validMoves[1];
  playerTwoMoveThreeType = validMoves[2];

  // Get array of three random numbers between 1 and 99 that sum to 99
  let randomValueArray = [];
  let maxValue = 99;
  randomValueArray.push(Math.floor(Math.random() * maxValue + 1));
  maxValue = maxValue - randomValueArray[0];
  randomValueArray.push(Math.floor(Math.random() * maxValue + 1));
  maxValue = maxValue - randomValueArray[1];
  randomValueArray.push(maxValue);

  // Check that values sum to 99
  let total = randomValueArray[0] + randomValueArray[1] + randomValueArray[2];
  if (total !== 99) {
    return null
  }

  // Set value variables for player two
  playerTwoMoveOneValue = randomValueArray[0];
  playerTwoMoveTwoValue = randomValueArray[1];
  playerTwoMoveThreeValue = randomValueArray[2];

}
