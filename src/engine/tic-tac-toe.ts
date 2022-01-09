import {
  BoardSize, ColumnPoint, GameBoard,
  GamePoint, GameRow, GameState, GameToken,
  GameTurn, GameDifficulty, IGame, IGameLevel, RowPoint
} from '../contracts';
import levelFactory from './level-factory';

class TicTacToe implements IGame {
  private boardSize: BoardSize;
  private strategy: IGameLevel;
  private board: GameBoard;
  private turn: GameTurn;
  private state: GameState;

  public winner: GameTurn | null;

  constructor(boardSize: BoardSize, difficulty: GameDifficulty) {
    this.boardSize = boardSize;
    this.turn = 'player';
    this.state = 'active';
    this.strategy = levelFactory(difficulty);
    this.board = this.createEmptyBoard();
    this.winner = null;
  }

  public get isActive(): boolean {
    return this.state === 'active';
  }

  public get isPlayerTurn(): boolean {
    return this.turn === 'player';
  }

  public stringifyBoard(): string {
    return this.board.map(row => row.map(x => x || ' ').join(' | ')).join('\n');
  }

  public go(rowIndex: number | null = null, columnIndex: number | null = null): void {
    try {
      if (this.isPlayerTurn) {
        // TODO: map?
        const playerPoint = ([rowIndex as RowPoint, columnIndex as ColumnPoint]) as GamePoint;
        this.setPoint(playerPoint);
      } else {
        const point = this.strategy.getPoint(this.board);
        this.setPoint(point);
      }

      this.checkState();
      this.checkTurn();
    } catch (e) {
      this.state = 'finished';
    }
  }

  private createEmptyBoard(): Array<Array<null>> {
    return [...Array(this.boardSize)].map(() => {
      const row = Array(this.boardSize);
      return row.fill(null);
    });
  }

  private checkTurn(): void {
    if (this.isActive) {
      this.turn = this.turn === 'player' ? 'computer' : 'player';
    }
  }

  private checkState(): void {
    const hasWinner = this.hasWinner();
    const hasEmptyCells = this.hasEmptyCells();

    if (hasWinner || !hasEmptyCells) {
      this.state = 'finished';

      if (hasWinner) {
        this.winner = this.turn;
      }
    }
  }

  private getToken(): GameToken {
    switch (this.turn) {
      case 'player':
        return GameToken.Player;
      case 'computer':
        return GameToken.Computer;
      default:
        throw new Error(`Unknown turn: ${this.turn}`);
    }
  }

  private setPoint([rowIndex, columnIndex]: GamePoint): void {
    const maxValue = this.boardSize - 1;
    const sanitizedRowIndex = Math.min(rowIndex, maxValue);
    const sanitizedColumnIndex = Math.min(columnIndex, maxValue);

    this.board[sanitizedRowIndex][sanitizedColumnIndex] = this.getToken();
  }

  private isRowWinner(token: GameToken): boolean {
    const checkRow = (row: GameRow) => row.every((cell: GameToken | null) => cell === token);
    return this.board.some(checkRow);
  }

  private isColumnWinner(token: GameToken): boolean {
    let i = 0;
    while (i < this.boardSize) {
      const areEqual = this.board.every((row) => row[i] === token);
      if (areEqual) {
        return true;
      }
      i += 1;
    }

    return false;
  }

  private isRightDiagonalWinner(token: GameToken): boolean {
    for (let i = this.boardSize - 1; i >= 0; i -= 1) {
      const element = this.board[i][i];
      if (element !== token) {
        return false;
      }
    }
    return true;
  }

  private isLeftDiagonalWinner(token: GameToken): boolean {
    for (let i = 0; i < this.boardSize; i += 1) {
      const element = this.board[i][i];
      if (element !== token) {
        return false;
      }
    }
    return true;
  }

  private hasWinner(): boolean {
    const token = this.getToken();

    const rowWinner = this.isRowWinner(token);
    const columnWinner = this.isColumnWinner(token);
    const leftDiagonalWinner = this.isLeftDiagonalWinner(token);
    const rightDiagonalWinner = this.isRightDiagonalWinner(token);

    return rowWinner || columnWinner || leftDiagonalWinner || rightDiagonalWinner;
  }

  private hasEmptyCells(): boolean {
    return this.board.some((row: GameRow): boolean =>
      row.some((cell: GameToken | null): boolean => cell === null));
  }
}

export default TicTacToe;
