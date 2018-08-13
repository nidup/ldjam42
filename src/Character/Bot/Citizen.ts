
import {Config} from "../../Config";
import {Street} from "../../Game/Street";
import {CanBeHurt} from "../CanBeHurt";
import {HorizontalDirection} from "../HorizontalDirection";
import {CharacterHurt} from "../SFX/CharacterHurt";
import {FearStatus} from "./FearStatus";
import {CouldBeAReplicant} from "./CouldBeAReplicant";
import {Hero} from "../Player/Hero";

const reactionsWithSounds = {
    'hey!': ['hey', 'hey1', 'hey2', 'hey3', 'hey4'],
    'dude...': ['dude'],
    'no worries mate': ['no-worries-mates', 'noworries2'],
    'want some?': ['heyman-want-some', 'wantsome2'],
    'STAHP': ['stap-go-away', 'stap2'],
    'what the.': ['what-de'],
    ':|': ['ouuuufffw', 'ouuuuuffff2'],
    'FU': ['huuuuum'],
    'don\'t touch my boobs': ['dont-touch-my-boobs'],
    'you wanna dance?': ['youwannadance'],
    'calm down': ['calm-down'],
    'fuck you': ['fuckyou1', 'fuckyou2', 'fuckyou3', 'fuckyou4', 'fuckyou5'],
    'burp': ['rototo2', 'rototo', 'bruitdegerbe3', 'bruitedegerb2', 'bruitdegerb']
};

const playerApologizes = ['sorry-o-sorry', 'oups-sorry', 'iaaaam-so-sorry',
    'sorry1', 'sorry3', 'sorry6', 'sorry9', 'sorry2', 'sorry5', 'sorry8', 'sorry4', 'sorry7', 'sorry10'];

export const TEXT_STYLE = {
    align: 'center',
    fill: '#fff',
    font: '8px PICO-8'
};

export const TEXT_STYLE_BIG = {
    align: 'center',
    fill: '#fff',
    font: '28px PICO-8'
};

export const TEXT_STYLE_SCORE = {
    align: 'center',
    fill: '#fff',
    font: '30px PICO-8'
};

export const TEXT_STYLE_MIDDLE = {
    align: 'center',
    fill: '#fff',
    font: '14px PICO-8'
};

export const TEXT_STYLE_HUGE = {
    align: 'center',
    fill: '#fff',
    font: '60px PICO-8'
};

export class Citizen extends Phaser.Sprite implements CanBeHurt, CouldBeAReplicant
{
    public body: Phaser.Physics.Arcade.Body;
    protected isReplicant: boolean = false;
    private fearStatus: FearStatus;
    private group: Phaser.Group;
    private street: Street;
    startingPosition: PIXI.Point;
    private text;
    private venere: boolean = false;
    private circlePitCenter: PIXI.Point = null;
    private wallOfDeath: PIXI.Point = null;
    private fightY: number = null;
    private exitZone;
    private exiting: boolean = false;
    private isFighing: boolean = false;
    private isHellyeahing: boolean = false;

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


        const idleRate = 2 + (Math.random() * 10);
        this.animations.add('idle', [12, 13, 14], idleRate, true);
        this.animations.add('walk', [0, 1, 2, 3, 4, 5], 12, true);

        let smokeFrames = [24, 25, 26, 27, 28, 29, 30, 31];
        for (let i = 0; i < 6; i++) {
            // Take smoke length
            smokeFrames.push(31)
        }
        smokeFrames = smokeFrames.concat([30, 29, 28, 27, 26, 25, 24]);
        for (let i = 0; i < 20; i++) {
            // Do nothing length
            smokeFrames.push(24)
        }
        const smokeRate = 4 + (Math.random() * 4);
        this.animations.add('smoke', smokeFrames, smokeRate, true);

        const talkRate = 4 + (Math.random() * 4);
        this.animations.add('talk', [40, 41, 42, 43, 44, 45], talkRate, true);

        const drinkRate = 4 + (Math.random() * 4);
        this.animations.add('drink', [52, 53, 52, 52, 52, 54, 55, 55, 56, 55, 55, 56, 55, 54, 52, 52, 52, 52, 52, 52, 52], drinkRate, true);
        this.animations.add('nervous', [57, 58, 59, 60, 61, 62, 63, 64, 65, 64, 65, 64, 65, 66, 67], 12, true);

        this.animations.add('hell', [88, 89, 88, 89, 88, 89], 7, true);

        this.street = street;

        this.playRandomAnim();
    }

    private playRandomAnim() {
        const randAnim = Math.random();
        if (randAnim < 0.25) {
            this.animations.play('idle');
        // } else if (randAnim < 0.4) {
            // this.animations.play('hell');
        } else if (randAnim < 0.5) {
            this.animations.play('smoke');
        } else if (randAnim < 0.75) {
            this.animations.play('talk');
        } else {
            this.animations.play('drink');
        }
    }

    update()
    {
        const previousX = this.x;

        if (this.isHellyeahing) {
            return;
        }

        if (!this.exiting && this.body.offset.x < 5) {
            this.body.setCircle(4, Math.min(this.body.offset.x + 0.3, 5), 18);
        }
        if (this.exiting) {
            this.body.collideWorldBounds = false;
            this.x -= 1;

            if (this.x < -20) {
                this.destroy(true);
            }

            return;
        }

        if (this.exitZone) {
            if (this.exitZone.isIn(this.position)) {
                this.exiting = true;

                return;
            }
            this.rapprocheToiDe(new PIXI.Point(0, 350), 2.5);
        }

        if (this.circlePitCenter) {
            const y = this.y - this.circlePitCenter.y;
            const x = this.x - this.circlePitCenter.x;
            const dist = Phaser.Math.distance(this.x, this.y, this.circlePitCenter.x, this.circlePitCenter.y);
            const currentAngle = Math.atan2(y, x);
            const desiredLength = 3;
            const fullCircleLength = Math.PI * 2 * dist;
            const percentage = desiredLength / fullCircleLength;
            const newAngle = currentAngle + Math.PI * 2 * percentage;
            this.x = this.circlePitCenter.x + Math.cos(newAngle) * dist;
            this.y = this.circlePitCenter.y + Math.sin(newAngle) * dist;

            if (this.animations.currentAnim.name !== 'walk') {
                this.animations.play('walk');
            }

            this.mirrorIfNeeded(previousX);

            return;
        }

        if (this.wallOfDeath) {
            if (Phaser.Math.distance(this.x, this.y, this.wallOfDeath.x, this.wallOfDeath.y) > 2) {
                this.rapprocheToiDe(this.wallOfDeath);

                this.mirrorIfNeeded(previousX);
            } else {
                if (this.animations.currentAnim.name !== 'hell') {
                    this.animations.play('hell');
                }
            }

            return;
        }

        if (this.fightY) {
            if (Phaser.Math.distance(this.x, this.y, this.x, this.fightY) > 1) {
                this.rapprocheToiDe(new PIXI.Point(this.x, this.fightY), 3);

                this.mirrorIfNeeded(previousX);
            } else {
                this.isFighing = true;
                this.fightY = null;
            }
        }

        if (this.isFighing) {
            const moveY = 6;
            const moveX = 1;
            const ecartement = 0.4;
            this.x += - moveX / 2 + Math.random() * moveX;
            if (this.y > 400) {
                this.y += -moveY / 2 + Math.random() * moveY + ecartement;
            } else {
                this.y += -moveY / 2 + Math.random() * moveY - ecartement;
            }

            if (Math.random() > 0.99) {
                this.fightY = 400;
                this.isFighing = false;
            }

            return;
        }

        /*if (this.x > 910) {
            this.x = 800;
        }*/

        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add((citizen, other) => {
            if (!this.exiting) {
                if (other instanceof Hero) {
                    if (this.venere == false) {
                        this.venere = true;
                        this.animations.play('nervous');
                        this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
                            this.playRandomAnim();
                            this.venere = false;
                        }, this);
                    }
                    this.animations.play('nervous');

                    let allSounds = Object.keys(reactionsWithSounds).reduce((acc, key) => {
                        return acc.concat(reactionsWithSounds[key]);
                    }, []);
                    let soundName = allSounds[Math.floor(Math.random() * allSounds.length)];
                    let text = Object.keys(reactionsWithSounds).find((key) => {
                        return reactionsWithSounds[key].indexOf(soundName) >= 0;
                    });
                    if (!this.text) {
                        this.text = this.game.add.text(this.x, this.y, text, TEXT_STYLE);
                        this.text.alpha = Math.max(1.1 - this.street.citizens().all().filter((citizen: Citizen) => {
                            return citizen.isVenere();
                        }).length * 0.1, 0.6);

                        const venereAudio = this.game.add.audio(soundName, 0.6, false);
                        venereAudio.play();

                        this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                            let sorryName = playerApologizes[Math.floor(Math.random() * playerApologizes.length)];
                            if (this.game) {
                                const sorryAudio = this.game.add.audio(sorryName, 1.0, false);
                                sorryAudio.play();
                            }
                        }, this);

                        let ref = this.text;
                        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                            ref.destroy();
                            this.text = null;
                        }, this);
                    }
                }
            }
        });

        if (this.isTooFarFromStartingPosition()) {
            this.rapprocheToiDeTaStartingPosition();
        } else {
            if (this.animations.currentAnim.name === 'walk') {
                this.playRandomAnim();
            }
        }
        if (Math.random() > 0.995) {
            // Random move
            const max = 50;
            const newStartingPosition = new PIXI.Point(
                this.startingPosition.x + Math.random() * max - max / 2,
                this.startingPosition.y + Math.random() * max - max / 2
            );
            if (newStartingPosition.x < 900 && newStartingPosition.x > 0 && newStartingPosition.y > 20 && newStartingPosition.y < 780) {
                const yolo = this.street.citizens().all().find((citizen) => {
                    const distance = Phaser.Math.distance(newStartingPosition.x, newStartingPosition.y, citizen.x, citizen.y) < 20;
                    const distance2 = Phaser.Math.distance(newStartingPosition.x, newStartingPosition.y, citizen.startingPosition.x, citizen.startingPosition.y) < 20;
                    const c_est_moi = citizen === this;
                    return distance && distance2 && !c_est_moi;
                });

                if (!yolo) {
                    this.startingPosition = newStartingPosition;
                }
            }
        }

        this.mirrorIfNeeded(previousX);
    }

    isVenere() {
        return this.venere;
    }

    exit(zone)
    {
        this.game.time.events.add(Math.random() * 20 * Phaser.Timer.SECOND, () => {
            this.exitZone = zone;
        });
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

    private rapprocheToiDe(point: PIXI.Point, speed = 0.8) {
        const dist = Phaser.Math.distance(this.x, this.y, point.x, point.y) / speed;
        const vector = new PIXI.Point(
            (this.x - point.x) / dist,
            (this.y - point.y) /dist
        );
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;

        if (this.animations.currentAnim.name !== 'walk' && this.animations.currentAnim.name !== 'nervous') {
            this.animations.play('walk');
        }
    }

    private rapprocheToiDeTaStartingPosition() {
        this.rapprocheToiDe(this.startingPosition);
    }

    setCirclePitCenter(center: PIXI.Point|null) {
        this.circlePitCenter = center;
    }

    goTopForWallOfDeath(height: number, x: number) {
        const wodHeight = 120;
        const a = wodHeight / height;
        const b = 400 - height + wodHeight - (400 * wodHeight) / height;
        this.wallOfDeath = new PIXI.Point(x, a * this.y + b);
    }

    goBottomForWallOfDeath(height: number, x: number) {
        const wodHeight = 120;
        const a = wodHeight / height;
        const b = 400 + height - wodHeight - (400 * wodHeight) / height;
        this.wallOfDeath = new PIXI.Point(x, a * this.y + b);
    }

    fight() {
        const gap = 40;
        if (this.wallOfDeath.y > 400) {
            this.fightY = 400 + (this.wallOfDeath.y - 400) / 5 - gap;
        } else {
            this.fightY = 400 - (400 - this.wallOfDeath.y) / 5 + gap;
        }
        this.wallOfDeath = null;
    }

    stopFight() {
        this.fightY = null;
        this.isFighing = false;
    }

    private mirrorIfNeeded(previousX: number) {
        if (this.x < previousX) {
            if (this.scale.x < 0) {
                this.scale.x = - this.scale.x;
            }
        } else if (this.x > previousX) {
            if (this.scale.x > 0) {
                this.scale.x = - this.scale.x;
            }
        } else {
            if (this.scale.x > 0) {
                this.scale.x = - this.scale.x;
            }
        }
    }

    canHellYeah() {
        return this.animations.currentAnim.name !== 'walk';
    }

    hellYeah(duration: number) {
        this.isHellyeahing = true;
        this.animations.play('hell');
        this.game.time.events.add(Phaser.Timer.SECOND * duration * Math.random(), () => {
            this.playRandomAnim();
            this.isHellyeahing = false;
        });
    };
}
