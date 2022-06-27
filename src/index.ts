import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { BoardSize, GameDifficulty } from './contracts';
import TicTacToe from './engine/tic-tac-toe';

export default async (boardSize: BoardSize = BoardSize.Small, difficulty: GameDifficulty = 'easy') => {
    console.log('Welcome to console tic-tac-toe!');

    const rl = readline.createInterface({ input, output });
    const game = new TicTacToe(boardSize, difficulty);

    const question = (message: string): Promise<string> => {
        return new Promise((resolve) => {
            rl.question(message, (answer: string) => resolve(answer))
        });
    }

    while (game.isActive) {
        if (game.isPlayerTurn) {
            console.log('Your turn...');

            const rowIndex = await question('Enter the row index: ');
            const columnIndex = await question('Enter the column index: ');

            game.go(+rowIndex, +columnIndex);
        } else {
            console.log('Computer turn...');

            game.go();
        }

        console.log('Current board:');
        console.log(game.stringifyBoard());
        console.log('-'.repeat(10))
    }

    console.log(`Game finished!\n${game.winner ? `The winner is ${game.winner}` : 'Nobody wins :('}`);

    rl.close();
};
