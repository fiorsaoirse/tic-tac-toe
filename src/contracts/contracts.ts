type Brand<T, B extends string> = T & { _brand: B };

export type GameDifficulty = 'easy' | 'normal' | 'hard';

export type GameTurn = 'player' | 'computer';

export type GameState = 'active' | 'finished';

export type RowPoint = Brand<number, 'row_point'>;

export type ColumnPoint = Brand<number, 'column_point'>;

export type GamePoint = [RowPoint, ColumnPoint];

export type GameRow = Array<GameToken | null>;

export type GameBoard = Array<GameRow>;

export enum BoardSize {
  Small = 3,
  Medium = 6,
  Large = 9
}

export enum GameToken {
  Player = 'x',
  Computer = 'o'
}

export interface IGame {
  isActive: boolean;
  go(row: number, column: number): void;
  stringifyBoard(): string;
}

export interface IGameLevel {
  getPoint(board: GameBoard): GamePoint;
}
