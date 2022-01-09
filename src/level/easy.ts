import { ColumnPoint, GameBoard, GamePoint, IGameLevel, RowPoint } from '../contracts';

export class EasyLevel implements IGameLevel {

  public getPoint(board: GameBoard): GamePoint {
    const size = board.length;
    for (let row = 0; row < size; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const cellValue = board[row][column];
        if (!cellValue) {
          return ([row as RowPoint, column as ColumnPoint]);
        }
      }
    }
    // Otherwise throw error
    throw new Error('Can not find empty cell!');
  }
}
