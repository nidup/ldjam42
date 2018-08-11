
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

export class Citizen extends Phaser.Sprite implements CanBeHurt, CouldBeAReplicant
{
    public body: Phaser.Physics.Arcade.Body;
    private brain: CitizenBrain;
    private dead: boolean = false;
    protected isReplicant: boolean = false;
    private fearStatus: FearStatus;
    private group: Phaser.Group;
    private street: Street;

    constructor(group: Phaser.Group, x: number, y: number, key: string, street: Street, replicant: boolean)
    {
        super(group.game, x, y, key, 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('idle', [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('run', [5, 6, 7, 8, 9, 10, 11, 12, 13], 24, true);
        if (replicant) {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 12, false);
        } else {
            this.animations.add('die', [14, 15, 16, 17, 18, 19, 20], 12, false);
        }

        this.fearStatus = new FearStatus();
        this.brain = new CitizenBrain(this, street, group, this.fearStatus);
        this.isReplicant = replicant;
        this.street = street;

        new BrainStateMarker(group, this, this.brain, replicant);
    }

    update()
    {
        if (!this.dead) {
            this.brain.think();
        }
    }

    die()
    {
        if (this.isReplicant) {
            const audio = this.game.add.audio('alien-dying', 1, false);
            audio.play();
        } else {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
        }

        this.animations.play('die');
        let randMoney = this.group.game.rnd.integerInRange(1, 3);
        if (randMoney === 1) {
            new PickableItem(this.group, this.x, this.y, 'Money', this.street.player());
        }

        this.dead = true;
    }

    run()
    {
        this.animations.play('run');
    }

    walk()
    {
        this.animations.play('walk');
    }

    rest()
    {
        this.animations.play('idle');
    }

    hurt(damage: number, fromDirection: HorizontalDirection)
    {
        this.health -= damage;
        const fx = new CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, this.replicant());
    }

    isDead(): boolean
    {
        return this.dead;
    }

    isDying(): boolean
    {
        return this.health <= 0;
    }

    isAfraid(): boolean
    {
        return this.fearStatus.isAfraid();
    }

    replicant(): boolean
    {
        return this.isReplicant;
    }
}
