
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
    private shotgun: ShotGun;
    private machinegun: MachineGun;
    private switchedTime: number = 0;
    private dead: boolean = false;
    private moneyAmount: number = 0;
    private cameraFx: HeroCamera;
    private gameEvents: GameEvents;
    private bulletHits: BulletHits;
    private group: Phaser.Group;
    private controller: Controller;
    private agressivenessGauge: AggressivenessGauge;

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
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.gun = new Gun(group, this, backbag.gunAmno());
        this.shotgun = new ShotGun(group, this, backbag.shotgunAmno());
        this.machinegun = new MachineGun(group, this, backbag.machinegunAmno());
        this.moneyAmount = backbag.money();

        this.animations.add('idle-'+this.gun.identifier(), [0, 1, 2, 3, 4], 4, true);
        this.animations.add('walk-'+this.gun.identifier(), [5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
        this.animations.add('die-'+this.gun.identifier(), [14, 15, 16, 17, 18, 19, 20], 12, false);
        this.animations.add('shot-'+this.gun.identifier(), [21, 22, 23, 24, 25, 26], 12, false);

        this.animations.add('idle-'+this.shotgun.identifier(), [27, 28, 29, 30, 31], 4, true);
        this.animations.add('walk-'+this.shotgun.identifier(), [32, 33, 34, 35, 36, 37, 38, 39, 40], 12, true);
        this.animations.add('die-'+this.shotgun.identifier(), [41, 42, 43, 44, 45, 46, 47], 12, false);
        this.animations.add('shot-'+this.shotgun.identifier(), [48, 49, 50, 51, 52, 53], 6, false);

        this.animations.add('idle-'+this.machinegun.identifier(), [54, 55, 56, 57, 58], 4, true);
        this.animations.add('walk-'+this.machinegun.identifier(), [59, 60, 61, 62, 63, 64, 65, 66, 67], 12, true);
        this.animations.add('die-'+this.machinegun.identifier(), [68, 69, 70, 71, 72, 73, 74], 12, false);
        this.animations.add('shot-'+this.machinegun.identifier(), [75, 76, 77, 78, 79, 80], 24, false);

        this.controller = controller;

        switch (gunIdentifier) {
            case 'Gun':
                this.switchToGun();
                break;
            case 'ShotGun':
                this.switchToShotGun();
                break;
            case 'MachineGun':
                this.switchToMachineGun();
                break;
            default:
                throw new Error("Gun identifier "+gunIdentifier+" is unknown");
        }

        this.cameraFx = new HeroCamera(group.game.camera);
        this.gameEvents = new GameEvents();
        this.bulletHits = new BulletHits(this, street);
        this.agressivenessGauge = new AggressivenessGauge(this.game.time);
    }

    public update()
    {
        if (this.health <= 0) {
            this.die();

        } else {
            this.controls();
            this.bulletHits.hit();
        }
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

    shotgunAmno(): number
    {
        return this.shotgun.amno();
    }

    machinegunAmno(): number
    {
        return this.machinegun.amno();
    }

    switchToNextUsableGun()
    {
        if (this.currentGun === this.gun) {
            if (this.shotgunAmno() > 0) {
                this.switchToShotGun();
            } else if (this.machinegunAmno() > 0) {
                this.switchToMachineGun();
            }
        } else if (this.currentGun === this.shotgun) {
            if (this.machinegunAmno() > 0) {
                this.switchToMachineGun();
            } else if (this.gunAmno() > 0) {
                this.switchToGun();
            }
        } else if (this.currentGun === this.machinegun) {
            if (this.gunAmno() > 0) {
                this.switchToGun();
            } else if (this.shotgunAmno() > 0) {
                this.switchToShotGun();
            }
        }
    }

    switchToMachineGun()
    {
        this.currentGun = this.machinegun;
        this.switchGunEffect();
    }

    switchToShotGun()
    {
        this.currentGun = this.shotgun;
        this.switchGunEffect();
    }

    switchToGun()
    {
        this.currentGun = this.gun;
        this.switchGunEffect();
    }

    isEquipedWithGun(): boolean
    {
        return this.currentGun == this.gun;
    }

    isEquipedWithShotgun(): boolean
    {
        return this.currentGun == this.shotgun;
    }

    equippedGun(): BaseGun
    {
        return this.currentGun;
    }

    pick(item: PickableItem)
    {
        if (item.key === 'Money') {
            const audio = this.game.add.audio('pick-money', 0.5, false);
            audio.play();
            const randAmount = this.game.rnd.integerInRange(2, 50);
            this.moneyAmount = this.moneyAmount + randAmount;
            this.gameEvents.register(new MoneyPicked(this.game.time.now, randAmount, this.moneyAmount));
        } else if (item.key === 'Gun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            this.gun.reload(11);
            this.gameEvents.register(new GunPicked(this.game.time.now));
        } else if (item.key === 'ShotGun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            if (this.shotgunAmno() === 0) {
                this.switchToShotGun();
            }
            this.shotgun.reload(6);
            this.gameEvents.register(new ShotGunPicked(this.game.time.now));
        } else if (item.key === 'MachineGun') {
            const audio = this.game.add.audio('pick-weapon', 1, false);
            audio.play();
            if (this.machinegunAmno() === 0) {
                this.switchToMachineGun();
            }
            this.machinegun.reload(15);
            this.gameEvents.register(new MachineGunPicked(this.game.time.now));
        }
        item.kill();
    }

    nurse(hospital: Hospital)
    {
        this.moneyAmount -= hospital.nurseCost();
    }

    pastGameEvents(): GameEvents
    {
        return this.gameEvents;
    }

    private controls()
    {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.controller.shooting()) {
            this.shot();

        // TODO: use justDown to fix this??
        } else if (this.controller.switchingWeapon() && this.game.time.now > this.switchedTime) {
            this.switchedTime = this.game.time.now + 500;
            this.switchToNextUsableGun();

        } else {
            if (this.controller.goingLeft()) {
                this.scale.x = -Config.pixelScaleRatio();
                this.body.velocity.x = -this.speed;
                this.animations.play('walk-'+this.currentGun.identifier());
                this.gun.turnToTheLeft();
                this.shotgun.turnToTheLeft();
                this.machinegun.turnToTheLeft();

            } else if (this.controller.goingRight()) {
                this.scale.x = Config.pixelScaleRatio();
                this.body.velocity.x = this.speed;
                this.animations.play('walk-'+this.currentGun.identifier());
                this.gun.turnToTheRight();
                this.shotgun.turnToTheRight();
                this.machinegun.turnToTheRight();
            }

            if (this.controller.goingUp()) {
                this.body.velocity.y = -this.speed;
                this.animations.play('walk-'+this.currentGun.identifier());

            } else if (this.controller.goingDown()) {
                this.body.velocity.y = this.speed;
                this.animations.play('walk-'+this.currentGun.identifier());
            }

            if (!this.controller.goingLeft() && !this.controller.goingRight() && !this.controller.goingDown() && !this.controller.goingUp()) {
                this.animations.play('idle-'+this.currentGun.identifier());
            }
        }
    }

    private shot()
    {
        this.animations.play('shot-'+this.currentGun.identifier());
        this.currentGun.fire();
        this.shotCameraEffects();
        if (this.currentGun === this.machinegun && this.machinegunAmno() === 0) {
            this.switchToShotGun();
        }
        if (this.currentGun === this.shotgun && this.shotgunAmno() === 0) {
            this.switchToGun();
        }
        this.agressivenessGauge.increase();
    }

    private shotCameraEffects()
    {
        if (this.currentGun === this.machinegun) {
            this.cameraFx.machinegunEffect();
        } else if (this.currentGun === this.shotgun) {
            this.cameraFx.shootgunEffect();
        } else {
            this.cameraFx.gunEffect();
        }
    }

    private switchGunEffect()
    {
        const switchGunSprite = this.game.add.sprite(this.x - 10, this.y - 40, this.currentGun.identifier(), 1, this.group);
        const duration = 300;
        const tween = this.group.game.add.tween(switchGunSprite).to( { y: switchGunSprite.y - 20 }, duration, "Linear", true);
        tween.onComplete.addOnce(function () { switchGunSprite.destroy();} );
    }

    private die()
    {
        if (!this.dead) {
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();
            this.dead = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die-'+this.currentGun.identifier());
            this.gameEvents.register(new HeroKilled(this.game.time.now));
        }
    }
}
