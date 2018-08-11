
import {Config} from "../Config";
import {Building} from "./Building";

export class Pub extends Phaser.Sprite implements Building
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'BuildingPub', 0);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        this.animations.add('idle', [0, 1, 2], 2, true);
        this.animations.play('idle');
    }
}
