import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    initialBoard.push([getRandom(), getRandom(), getRandom()], [getRandom(), getRandom(), getRandom()], [getRandom(), getRandom(), getRandom()]);
    return initialBoard;
  }

  function getRandom() {
    return (Math.random() < 0.5);
  }

  function hasWon(board) {
    // check the board in state to determine whether the player has won.
    for (let innerBoard of board) {
      for (let i of innerBoard) {
        if (i === true) {
          return false;
        }
      }
    }
    return <winner/>;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      let deepBoard = oldBoard.map(b => b)
      // in the copy, flip this cell and the cells around it
      flipCell(y, x, deepBoard);
      // return the copy
      return deepBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  function winner() {
    document.body.innerHTML = '';
    return (
      <p>Winner!</p>
    );
  }

  // make table board

    return (
      <table>
        <tbody>
          <tr>
            {board[0].map((val) => <Cell flipCellsAroundMe={flipCellsAround} isLit={val}/>)}
          </tr>
          <tr>
            {board[1].map((val) => <Cell flipCellsAroundMe={flipCellsAround} isLit={val}/>)}
          </tr>
          <tr>
            {board[2].map((val) => <Cell flipCellsAroundMe={flipCellsAround} isLit={val}/>)}
          </tr>
        </tbody>
      </table>
    );
}

export default Board;
