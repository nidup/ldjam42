
import {Street} from "../../Game/Street";
import {Gun} from "../../Weapon/Gun";
import {PickableItem} from "./PickableItem";
import {ShotGun} from "../../Weapon/ShotGun";
import {BaseGun} from "../../Weapon/BaseGun";
import {BackBag} from "./BackBag";
import {
    GameEvents, GunPicked, HeroKilled, HeroNursed, MachineGunPicked, MoneyPicked,
    ShotGunPicked
} from "./Events";
import {MachineGun} from "../../Weapon/MachineGun";
import {CanBeHurt} from "../CanBeHurt";
import {HorizontalDirection} from "../HorizontalDirection";
import {CharacterHurt} from "../SFX/CharacterHurt";
import {HeroCamera} from "../SFX/HeroCamera";
import {BulletHits} from "./BulletHits";
import {Config} from "../../Config";
import {Controller} from "../../Game/Controller";
import {AggressivenessGauge} from "./AggressivenessGauge";
import {Hospital} from "../../Building/Hospital";

export class Hero extends Phaser.Sprite implements CanBeHurt
{
    public body: Phaser.Physics.Arcade.Body;
    private speed: number = 150;
    private currentGun: BaseGun;
    private gun: Gun;
    private switchedTime: number = 0;
    private dead: boolean = false;
    private moneyAmount: number = 0;
    private cameraFx: HeroCamera;
    private gameEvents: GameEvents;
    private bulletHits: BulletHits;
    private group: Phaser.Group;
    private controller: Controller;
    private agressivenessGauge: AggressivenessGauge;
    private citizens;
    public points = 0;
    public energy = 100;
    private exitZone;
    public finished = false;

    constructor(
        group: Phaser.Group,
        x: number,
        y: number,
        key: string,
        street: Street,
        backbag: BackBag,
        controller: Controller,
        gunIdentifier: string
    ) {
        super(group.game, x, y, key, 0);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;

        this.inputEnabled = true;
        this.scale.setTo(-Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(10, 0, 14);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.gun = new Gun(group, this, backbag.gunAmno());
        this.currentGun = this.gun;
        this.moneyAmount = backbag.money();

        this.animations.add('idle', [100, 101, 102], 8, true);
        this.animations.add('walk', [94, 95, 96, 97, 98, 99], 8, true);
        this.animations.add('die', [0], 12, false);
        this.animations.add('sorry', [103, 104, 105, 106, 107, 108], 8, false);

        this.controller = controller;

        this.cameraFx = new HeroCamera(group.game.camera);
        this.gameEvents = new GameEvents();
        this.bulletHits = new BulletHits(this, street);
        this.citizens = street.citizens();
        this.agressivenessGauge = new AggressivenessGauge(this.game.time);
    }

    public update()
    {
        if (this.exitZone && this.exitZone.isIn(this.position)) {
            return this.finished = true;
        }
        this.controls();
        this.bulletHits.hit();
        let angryCount = this.citizens.all().filter(citizen => citizen.text).length;
        if (angryCount > 2 && this.x > 0) {
            this.body.checkCollision.none = !this.movingToTheRight();
            this.x -= 1;
            this.y += (Math.random() - 0.5) * 2;
        }
        else {
            this.body.checkCollision.none = false;
        }

        this.mirrorIfNeeded();

        if (this.x < 20) {
            this.x = 20;
        }
    }

    equippedGun()
    {
        return this.gun;
    }

    hurt(damage: number, fromDirection: HorizontalDirection)
    {
        this.health -= damage;
        const fx = new CharacterHurt();
        fx.blinkHero(this, fromDirection);
    }

    isDying(): boolean
    {
        return this.health <= 0;
    }

    movingToTheRight(): boolean
    {
        return this.body.velocity.x > 0;
    }

    movingToTheLeft(): boolean
    {
        return this.body.velocity.x < 0;
    }

    isAggressive(): boolean
    {
        return this.agressivenessGauge.isAggressive();
    }

    isDead(): boolean
    {
        return this.dead;
    }

    money(): number
    {
        return this.moneyAmount;
    }

    gunAmno(): number
    {
        return this.gun.amno();
    }

    pick(item: PickableItem)
    {
        if (item.key === 'Money') {
            //const audio = this.game.add.audio('pick-money', 0.5, false);
            //audio.play();
            const randAmount = this.game.rnd.integerInRange(2, 50);
            this.moneyAmount = this.moneyAmount + randAmount;
            this.gameEvents.register(new MoneyPicked(this.game.time.now, randAmount, this.moneyAmount));
        }
        item.kill();
    }

    pastGameEvents(): GameEvents
    {
        return this.gameEvents;
    }

    private controls()
    {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        let angryCount = this.citizens.all().filter(citizen => citizen.text).length;
        let walkAnimName = 'walk';
        if (angryCount > 0) {
            walkAnimName = 'sorry';
        }

        if (this.controller.shooting()) {
            this.x += 5;
            this.energy = Math.max(0, this.energy - 1);
            this.animations.play(walkAnimName);
            if (this.energy)  {
                const change = 0.5;
                const minRadius = 3;
                const radius = this.body.radius - change;
                if (radius > minRadius) {
                    this.body.setCircle(radius, 10 - radius, 14);
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                        this.body.setCircle(this.body.radius + change, 10 - this.body.radius, 14);
                    });
                }
            }

        } else {
            this.scale.x = -Config.pixelScaleRatio();
            if (this.controller.goingLeft()) {
                this.body.velocity.x = -this.speed;
                this.gun.turnToTheLeft();
                this.animations.play(walkAnimName);

            } else if (this.controller.goingRight()) {
                this.body.velocity.x = this.speed;
                this.gun.turnToTheRight();
                this.animations.play(walkAnimName);
            }

            if (this.controller.goingUp()) {
                this.body.velocity.y = -this.speed;
                this.animations.play(walkAnimName);

            } else if (this.controller.goingDown()) {
                this.body.velocity.y = this.speed;
                this.animations.play(walkAnimName);
            }

            if (!this.controller.goingLeft() && !this.controller.goingRight() && !this.controller.goingDown() && !this.controller.goingUp()) {
                this.animations.play('idle');
            }
        }
    }

    private shot()
    {
        //this.animations.play('sorry');
        //this.currentGun.fire();
        //this.shotCameraEffects();
        //this.agressivenessGauge.increase();
    }

    private shotCameraEffects()
    {
        this.cameraFx.gunEffect();
    }

    private die()
    {
        if (!this.dead) {
            /*
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();*/
            this.dead = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die');
            this.gameEvents.register(new HeroKilled(this.game.time.now));
        }
    }

    private mirrorIfNeeded() {
        if (this.body.velocity.x < 0) {
            if (this.scale.x < 0) {
                this.scale.x = - this.scale.x;
            }
        } else if (this.body.velocity.x > 0) {
            if (this.scale.x > 0) {
                this.scale.x = - this.scale.x;
            }
        } else {
            if (this.scale.x > 0) {
                this.scale.x = - this.scale.x;
            }
        }
    }

    exit(zone)
    {
        this.exitZone = zone;
    }
}
