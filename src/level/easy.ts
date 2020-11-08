import { gameValue } from 'engine/tic-tac-toe';
import { IGameLevel } from './gameLevel';

class EasyLevel implements IGameLevel {
  public getPoint(matrix: gameValue[][]): number[] {
    for (let row = 0; row < matrix.length; row += 1) {
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

export default EasyLevel;
