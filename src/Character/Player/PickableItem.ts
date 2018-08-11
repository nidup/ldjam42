
import {Config} from "../../Config";
import {Hero} from "./Hero";

export class PickableItem extends Phaser.Sprite
{
    private player: Hero;
    private picking: boolean = false;
    private pickingTween: Phaser.Tween;

    constructor(group: Phaser.Group, x: number, y: number, key: string, player: Hero)
    {
        super(group.game, x, y - 10, key, 0);
        this.player = player;

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('blink', [0, 1], 1, true);
        this.animations.play('blink');

        const fallAngle = 180;
        this.angle -= fallAngle;
        const fallDestinationY = this.y + 30;
        const fallNewAngle = this.angle + fallAngle;
        this.game.add.tween(this).to({y: fallDestinationY, angle: fallNewAngle}, 600, Phaser.Easing.Bounce.Out, true);

        const pickDestinationY = fallDestinationY - 30;
        const pickNewAngle = fallNewAngle - 180;
        this.pickingTween = this.game.add.tween(this).to({y: pickDestinationY, angle: pickNewAngle}, 100, Phaser.Easing.Bounce.Out);
        const item = this;
        this.pickingTween.onComplete.addOnce(function() { player.pick(item); });
    }

    public update()
    {
        this.game.physics.arcade.overlap(
            this.player,
            this,
            function(player: Hero, item: PickableItem) {
                if (!this.picking) {
                    this.picking = true;
                    this.pickingTween.start();
                }
            },
            null,
            this
        );
    }
}
