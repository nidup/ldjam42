
import {Config} from "../../Config";
import {CitizenBrain} from "./Brain/CitizenBrain";
import {Street} from "../../Game/Street";
import {CanBeHurt} from "../CanBeHurt";
import {HorizontalDirection} from "../HorizontalDirection";
import {CharacterHurt} from "../SFX/CharacterHurt";
import {FearStatus} from "./FearStatus";
import {PickableItem} from "../Player/PickableItem";
import {BrainStateMarker} from "./BrainStateMarker";
import {CouldBeAReplicant} from "./CouldBeAReplicant";

export class AlienQueen extends Phaser.Sprite implements CanBeHurt
{
    public body: Phaser.Physics.Arcade.Body;
    private dead: boolean = false;
    private group: Phaser.Group;

    constructor(group: Phaser.Group, x: number, y: number, key: string)
    {
        super(group.game, x, y, key, 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(40, 22, 44);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.health = 600;

        this.animations.add('idle', [0, 1, 2], 1, true);
        this.animations.add('die', [2, 3, 4], 12, false);
        this.animations.play('idle');
    }

    update()
    {
        if (this.health <= 0 && this.isDead() == false) {
            this.die();
        }
    }

    die()
    {
        this.animations.play('die');
        this.dead = true;
    }

    hurt(damage: number, fromDirection: HorizontalDirection)
    {
        const audio = this.game.add.audio('alien-dying', 1, false);
        audio.play();
        this.health -= damage;
        const fx = new CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, false);
    }

    isDead(): boolean
    {
        return this.dead;
    }

    isDying(): boolean
    {
        return this.health <= 0;
    }
}
