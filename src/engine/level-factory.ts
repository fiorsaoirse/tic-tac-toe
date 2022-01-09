import { GameDifficulty, IGameLevel } from '../contracts';
import { EasyLevel, HardLevel, NormalLevel } from '../level';

export default function levelFactory(difficulty: GameDifficulty): IGameLevel {
    switch (difficulty) {
        case 'easy':
            return new EasyLevel();
        case 'normal':
            return new NormalLevel();
        case 'hard':
            return new HardLevel();
        default:
            throw new Error(`Unknown difficulty type: ${difficulty}`);
    }
};
