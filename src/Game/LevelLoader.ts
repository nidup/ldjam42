
import {Level} from "./Level";

export class LevelLoader
{
    load(game: Phaser.Game, levelNumber: number): Level
    {
        const levelsData = JSON.parse(game.cache.getText('levels'));
        const levelData = levelsData[levelNumber - 1];
        const level = new Level(levelNumber, levelData);

        return level;
    }
}
