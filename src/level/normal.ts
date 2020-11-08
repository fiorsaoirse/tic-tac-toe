import { gameValue } from 'engine/tic-tac-toe';
import { IGameLevel } from './gameLevel';

class NormalLevel implements IGameLevel {
  public getPoint(matrix: gameValue[][]): number[] {
    for (let row = matrix.length - 1; row >= 0; row -= 1) {
      for (let column = 0; column < matrix[row].length; column += 1) {
        const cell = matrix[row][column];
        if (cell === null) {
          return ([ row, column ]);
        }
      }
    }
    throw new Error('Can not find empty place');
  }

}

export default NormalLevel;
