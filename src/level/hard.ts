import { ColumnPoint, GameBoard, GamePoint, IGameLevel, RowPoint } from '../contracts';

const MIN_INDEX = 0;

export class HardLevel implements IGameLevel {

    private static getRandomIndex(maxIndex: number): number {
        return Math.floor(Math.random() * (maxIndex - MIN_INDEX)) + MIN_INDEX;
    }

    public getPoint(board: GameBoard): GamePoint {
        const size = board.length;

        if (this.hasEmptyCells(board)) {
            let row = HardLevel.getRandomIndex(size);
            let column = HardLevel.getRandomIndex(size);
            let cellValue = board[row][column];

            while (cellValue !== null) {
                row = HardLevel.getRandomIndex(size);
                column = HardLevel.getRandomIndex(size);
                cellValue = board[row][column];
            }

            return ([row as RowPoint, column as ColumnPoint]);
        }
        // Otherwise throw error
        throw new Error('Can not find empty cell!');
    }

    // TODO: можно ли убрать дублирование? Переделать GameBoard в класс?
    private hasEmptyCells(board: GameBoard): boolean {
        return board.some(row => row.some(cell => cell === null));
    }
}
