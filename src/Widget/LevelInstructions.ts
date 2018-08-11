
import {Config} from "../Config";
import {Level} from "../Game/Level";

export class LevelInstructions extends Phaser.Sprite
{
    constructor(group: Phaser.Group, x: number, y: number, key: string, level: Level)
    {
        super(group.game, x, y, key, 0);
        group.add(this);

        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.fixedToCamera = true;

        const fontTutorialSize = 13;

        const levelToDaysNumber= {
            1:  'One',
            2:  'Two',
            3:  'Three',
            4:  'Four',
            5:  'Five',
            6:  'Six',
            7:  'Seven',
            8:  'Eight',
            9:  'Nine',
            10: 'Ten',
            11: 'Eleven',
            12: 'Twelve',
            13: 'Thirteen'
        };

        const lineLength = 48;
        const fullText = level.tutorial();
        const tokens = fullText.split(' ');
        let lines = [];
        let line = 'Day '+levelToDaysNumber[level.number()]+": ";
        tokens.forEach(function(token: string) {
            if ((line + token).length >= lineLength) {
                lines.push(line);
                line = "";
            }
            line += " " + token;
        });
        lines.push(line);
        let formattedText = "";
        lines.forEach(function(line: string) {
            formattedText += line.trim() + "\n";
        });


        const tutorialText = this.game.add.bitmapText(this.x + 45, 45, 'cowboy', formattedText, fontTutorialSize);
        tutorialText.fixedToCamera = true;

        const levelText = this.game.add.bitmapText(400, 300, 'cowboy','Day '+levelToDaysNumber[level.number()], 40);
        levelText.alpha = 1;
        const tweenAlpha = this.game.add.tween(levelText).to( { alpha: 0 }, 0, "Linear", true);
    }
}
