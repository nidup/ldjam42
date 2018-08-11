
import {Config} from "../Config";
import {Building} from "./Building";

export class Hostel extends Phaser.Sprite implements Building
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'BuildingHostel', 0);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        this.animations.add('idle', [0, 1, 2], 3, true);
        this.animations.play('idle');
    }
}
