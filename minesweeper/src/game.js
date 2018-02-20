import { Board } from './board';

export class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over!');
      this._board.print(this._board);
    }
    if(this._board.hasSafeTiles() === false) {
      console.log('You won! Congratulations!');
    } else {
      console.log('Current Board:');
      this._board.print(this._board);
    }
  }
}
