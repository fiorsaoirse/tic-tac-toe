#!/usr/bin/env node
import * as inquirer from 'inquirer';
import { BoardSize } from '../contracts';
import startGame from '../index';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'boardSize',
      message: 'Select board size:',
      choices: [
        {
          name: 'Small (3x3)',
          value: BoardSize.Small
        },
        {
          name: 'Medium (6x6)',
          value: BoardSize.Medium
        },
        {
          name: 'Large (9x9)',
          value: BoardSize.Large
        }
      ],
      default: BoardSize.Small
    },
    {
      type: 'list',
      name: 'difficulty',
      message: 'Select difficulty:',
      choices: [
        { name: 'Easy', value: 'easy' },
        { name: 'Normal', value: 'normal' },
        { name: 'Hard', value: 'hard' }
      ],
      default: 'easy'
    }
  ])
  .then(answers => {
    const { boardSize, difficulty } = answers;
    return startGame(boardSize, difficulty);
  });