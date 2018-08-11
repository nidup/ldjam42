
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
        this.scale.setTo(-Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(4, 5, 14);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('idle', [12, 13, 14], 4, true);
        this.animations.add('walk', [0, 1, 2, 3, 4, 5], 12, true);
        this.animations.add('smoke', [24, 25, 26, 27, 28, 29, 30, 31], 4, true);
        this.animations.add('talk', [40, 41, 42, 43, 44, 45], 4, true);
        this.animations.add('drink', [52, 53, 54, 55, 56], 4, true);
        this.animations.add('nervous', [57, 58, 59, 60, 61, 62, 63, 64, 65, 64, 65, 64, 65, 66, 67], 12, true);

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
