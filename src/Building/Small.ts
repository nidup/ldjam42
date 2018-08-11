
import {Config} from "../Config";
import {Building} from "./Building";

export class Small extends Phaser.Sprite implements Building
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'BuildingSmall', 0);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
    }
}
