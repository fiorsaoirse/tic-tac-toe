import { ColumnPoint, GameBoard, GamePoint, IGameLevel, RowPoint } from '../contracts';

const MIN_INDEX = 0;

export class HardLevel implements IGameLevel {

    private static getRandomIndex(maxIndex: number): number {
        return Math.floor(Math.random() * (maxIndex - MIN_INDEX)) + MIN_INDEX;
    }

    // TODO: подумать, как тут переделать логику с учетом
    // отсутствия количества попыток, т.е. надо учитывать вообще
    // в целом "можно ли сделать ход"

    public getPoint(board: GameBoard): GamePoint {
        const size = board.length;
        let maxCountOfTries = size * size;

        while (maxCountOfTries !== 0) {
            const row = HardLevel.getRandomIndex(size);
            const column = HardLevel.getRandomIndex(size);
            const cellValue = board[row][column];

            if (!cellValue) {
                return ([row as RowPoint, column as ColumnPoint]);
            }

            maxCountOfTries -= 1;
        }

        throw new Error('Can not find empty cell!');
    }

}
