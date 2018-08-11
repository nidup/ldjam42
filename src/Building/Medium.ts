
import {Config} from "../Config";
import {Building} from "./Building";

export class Medium extends Phaser.Sprite implements Building
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'BuildingMedium', 0);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
    }
}
