
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
    protected isReplicant: boolean = false;
    private fearStatus: FearStatus;
    private group: Phaser.Group;
    private street: Street;
    startingPosition: PIXI.Point;

    constructor(group: Phaser.Group, x: number, y: number, key: string, street: Street, replicant: boolean)
    {
        super(group.game, x, y, key, 0);

        this.startingPosition = new PIXI.Point(x, y);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;

        this.inputEnabled = true;
        this.scale.setTo(-Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(4, 5, 18);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        //this.body.immovable = Math.random() > 0.95;
        this.body.maxVelocity.set(1, 1);

        this.animations.add('idle', [12, 13, 14], 4, true);
        this.animations.add('walk', [0, 1, 2, 3, 4, 5], 12, true);
        this.animations.add('smoke', [24, 25, 26, 27, 28, 29, 30, 31], 15, true);
        this.animations.add('talk', [40, 41, 42, 43, 44, 45], 4, true);
        this.animations.add('drink', [52, 53, 54, 55, 56], 4, true);
        this.animations.add('nervous', [57, 58, 59, 60, 61, 62, 63, 64, 65, 64, 65, 64, 65, 66, 67], 12, true);

        //this.fearStatus = new FearStatus();
        //this.brain = new CitizenBrain(this, street, group, this.fearStatus);
        //this.isReplicant = replicant;
        this.street = street;

        //new BrainStateMarker(group, this, this.brain, replicant);
    }

    update()
    {
        if (this.isTooFarFromStartingPosition()) {
            this.rapprocheToiDeTaStartingPosition();
        }
        if (Math.random() > 0.999) {
            // Random move
            const max = 30;
            this.startingPosition = new PIXI.Point(
                this.startingPosition.x + Math.random() * max - max / 2,
                this.startingPosition.y + Math.random() * max - max / 2
            );
        }
    }

    die()
    {
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
        // TODO Remove
        return false;
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

    private isTooFarFromStartingPosition() {
        return Phaser.Math.distance(this.x, this.y, this.startingPosition.x, this.startingPosition.y) > 3;
    }

    private rapprocheToiDeTaStartingPosition() {
        const dist = Phaser.Math.distance(this.x, this.y, this.startingPosition.x, this.startingPosition.y) / 0.5;
        const vector = new PIXI.Point(
            (this.x - this.startingPosition.x) / dist,
            (this.y - this.startingPosition.y) /dist
        );
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
    }
}
