import { gameValue } from 'engine/tic-tac-toe';

export interface IGameLevel {
  getPoint(matrix: gameValue[][]): number[];
}
