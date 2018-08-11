
import {Config} from "../../Config";
import {Brain} from "./Brain/Brain";

export class BrainStateMarker extends Phaser.Sprite
{
    private brain: Brain;
    private host: Phaser.Sprite;

    constructor(group: Phaser.Group, host: Phaser.Sprite, brain: Brain, replicant: boolean)
    {
        super(group.game, host.x, host.y, 'Marker', 0);
        group.add(this);
        this.host = host;
        this.brain = brain;

        this.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.animations.add('nothing', [5], 4, true);
        this.animations.add('afraid', [3, 4], 4, true);
        this.animations.add('attack', [0, 1, 2], 4, true);
        if (replicant) {
            this.animations.add('dying', [8, 9, 10], 2, false);
        } else {
            this.animations.add('dying', [6, 7], 2, false);
        }
    }

    update()
    {
        if (this.brain.currentStateName() === 'dying') {
            this.play('dying', 4, false, true);

        } else if (this.brain.currentStateName() === 'flee') {
            this.play('afraid');

        } else if (this.brain.currentStateName() === 'attack') {
            this.play('attack');

        } else {
            this.play('nothing');
        }

        this.x = this.host.x - 22;
        this.y = this.host.y - 60;
    }
}
