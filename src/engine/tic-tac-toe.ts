import EasyLevel from 'level/easy';
import { IGameLevel } from 'level/gameLevel';
import NormalLevel from 'level/normal';

export type gameValue = string | null;

export interface ITicTacToe {
  go(row: number, column: number): boolean;
}

class TicTacToe implements ITicTacToe {
  private static strategyType: { [key: string]: IGameLevel } = {
    easy: new EasyLevel(),
    normal: new NormalLevel(),
  };

  private static tokenMapper: { [key: string]: string } = {
    X: 'O',
    O: 'X',
  };

  private dimension: number;
  private field: gameValue[][];
  private strategy: IGameLevel;
  private token: string;

  constructor(dimension: number = 3, difficulty: string = 'easy', token: string = 'O') {
    this.dimension = dimension;
    this.field = this.createGameField();
    this.strategy = TicTacToe.strategyType[difficulty];
    this.token = token;
  }

  public createRow(): null[] {
    const row = Array(this.dimension);
    return row.fill(null);
  }

  public createGameField(): null[][] {
    const emptyField = Array(this.dimension);
    const field = [ ...emptyField ].map(() => this.createRow());
    return field;
  }

  private isRowWinner(token: string): boolean {
    const checkRow = (row: gameValue[]) => row.every((cell: gameValue) => cell === token);
    return this.field.some(checkRow);
  }

  private isColumnWinner(token: string): boolean {
    let i = 0;
    while (i < this.dimension) {
      const isTokensEqual = this.field.every((row) => row[i] === token);
      if (isTokensEqual) {
        return true;
      }
      i += 1;

    }
    return false;
  }

  private isDiagonalWinner(token: string): boolean {
    for (let i = 0; i < this.field.length; i += 1) {
      const element = this.field[i][i];
      if (element !== token) {
        return false;
      }
    }
    return true;
  }

  private isWinner(): boolean {
    const token = this.token;
    const rowWin = this.isRowWinner(token);
    const colWin = this.isColumnWinner(token);
    const diagonalWin = this.isDiagonalWinner(token);
    return rowWin || colWin || diagonalWin;
  }

  private setPoint(columnIndex: number, rowIndex: number): boolean {
    this.field[columnIndex][rowIndex] = this.token;
    return this.isWinner();
  }

  public go(rowIndex: number | null = null, columnIndex: number | null = null): boolean {
    this.token = TicTacToe.tokenMapper[this.token];
    const isGameTurn = (rowIndex ?? columnIndex ?? null) == null;
    if (isGameTurn) {
      const [ gameColumnIndex, gameRowIndex ] = this.strategy.getPoint(this.field);
      return this.setPoint(gameColumnIndex, gameRowIndex);
    }
    return this.setPoint(rowIndex, columnIndex);
  }
}

export default TicTacToe;
