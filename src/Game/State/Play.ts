
import {Street} from "../Street";
import {Citizen, TEXT_STYLE, TEXT_STYLE_BIG, TEXT_STYLE_MIDDLE} from "../../Character/Bot/Citizen";
import {BackBag} from "../../Character/Player/BackBag";
import {Config} from "../../Config";
import {LevelLoader} from "../LevelLoader";
import {KeyBoardController} from "../Controller";
import {StreetLimits} from "../StreetLimits";
import {CharactersGenerator} from "../../Character/CharactersGenerator";
import {CirclePit} from "../../Yolo/CirclePit";
import {WallOfDeath} from "../../Yolo/WallOfDeath";
import {BLINKCOLOR, BLINKINCOLOR, MetalMovement} from "../../Yolo/MetalMovement";
import {Nothing} from "../../Yolo/Nothing";
import {Exit} from "../../Yolo/Exit";
import {BigText} from "../../Yolo/BigText";
import {BigTextPositionner} from "../../Yolo/BigTextPositionner";
import {ScoreDisplay} from "../../Yolo/ScoreDisplay";

const POINTS_MULTIPLIER = 20;

const SINGER_TEXTS = {
    "You're awesome!": 'singer-yourawesome',
    'You rock!!!': 'singer-yourock',
    "Amazing!!!": 'singer-amazing',
    "You motherfuckers!": 'singer-motherfocka',
    "Come onnnnn!": 'singer-comon',
    'Thank you!': 'singer-thank-you'
};

export default class Play extends Phaser.State
{
    private sky: Phaser.TileSprite;
    private background: Phaser.TileSprite;
    private street: Street;
    private characterLayer: Phaser.Group;
    private levelNumber: number = 1;
    private switchingLevel: boolean = false;
    private previousInventory: {'gunAmno': number, 'shotgunAmno': number, 'machinegunAmno': number, 'money': number} = null;
    private previousGunType: string;
    private controllerType: string = null;
    private playerPosition: Phaser.Point;
    private leftBoundMargin: Phaser.TileSprite;
    private rightBoundMargin: Phaser.TileSprite;
    private topBoundMargin: Phaser.TileSprite;
    private isFinalLevel: boolean = false;
    private graphics: Phaser.Graphics;
    private graphicsIn: Phaser.Graphics;
    private currentMetalMovement: MetalMovement;
    private beginningIsIn = null;
    private singerText: Phaser.Text = null;
    private singerTextShadow: Phaser.Text = null;
    private lamps: Phaser.Sprite[];
    private musicians;
    private previousDiffPoints: number = 0;
    private bigTextPositionner: BigTextPositionner;
    private lastRandomSinger: string = '';
    private singerCanSpeak: boolean = true;
    private scoreDisplay: ScoreDisplay;

    public init (
        controllerType: string,
        level: number = 1,
        previousInventory = {'gunAmno': 100, 'shotgunAmno': 0, 'machinegunAmno': 0, 'money': 0},
        currentGunType: string = 'Gun',
        playerPosition: Phaser.Point = null
    ) {
        this.levelNumber = level;
        this.previousInventory = previousInventory;
        this.switchingLevel = false;
        this.controllerType = controllerType;
        this.previousGunType = currentGunType;
        this.playerPosition = playerPosition;
        if (level == 12) {
            this.isFinalLevel = true;
        }
    }

    public create()
    {
        this.scoreDisplay = new ScoreDisplay(this.game);
        this.bigTextPositionner = new BigTextPositionner(this.game);

        if (Config.debug()) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';

        const levelLoader = new LevelLoader();
        const level = levelLoader.load(this.game, this.levelNumber);

        const skyLayer = this.game.add.group();
        skyLayer.name = 'Sky';

        const backgroundLayer = this.game.add.group();
        backgroundLayer.name = 'Background';

        const buildingsLayer = this.game.add.group();
        buildingsLayer.name = 'Buildings';

        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';

        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';

        let streetPositionX = 0;
        let sideMarginWidth = 1;
        let rightCameraMarginX = this.game.width;
        /*
        const detector = new DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            streetPositionX += Config.mobileExtraSidePadding();
            sideMarginWidth = Config.mobileExtraSidePadding();
            rightCameraMarginX -= Config.mobileExtraSidePadding();
        }*/

        const leftCameraMargin = this.game.add.tileSprite(0, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        leftCameraMargin.fixedToCamera = true;

        this.leftBoundMargin = this.game.add.tileSprite(0, 0, 1, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.leftBoundMargin, Phaser.Physics.ARCADE);
        this.leftBoundMargin.body.immovable = true;
        this.leftBoundMargin.body.allowGravity = false;
        this.leftBoundMargin.alpha = 0;

        const rightCameraMargin = this.game.add.tileSprite(rightCameraMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        rightCameraMargin.fixedToCamera = true;

        const streetWidth = 915;

        let worldWidth = streetWidth;
        let rightBoundMarginX = streetWidth;
        /*
        if (detector.isMobile()) {
            worldWidth += Config.mobileExtraSidePadding();
        }*/

        this.rightBoundMargin = this.game.add.tileSprite(rightBoundMarginX, 0, 100, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.rightBoundMargin, Phaser.Physics.ARCADE);
        this.rightBoundMargin.body.immovable = true;
        this.rightBoundMargin.body.allowGravity = false;
        this.rightBoundMargin.alpha = 0;

        const streetPositionY = 20;
        let topBoundMarginY = streetPositionY - 40;
        this.topBoundMargin = this.game.add.tileSprite(0, topBoundMarginY, worldWidth, 1, 'Top', 0, interfaceLayer);
        this.game.physics.enable(this.topBoundMargin, Phaser.Physics.ARCADE);
        this.topBoundMargin.body.immovable = true;
        this.topBoundMargin.body.allowGravity = false;

        const height = 1200;
        const heightPosition = -400;

        this.sky = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height,'sky',0, skyLayer);
        this.sky.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        this.background = this.game.add.tileSprite(0, 0, 1200, 800, 'main', 0, backgroundLayer);
        //this.background = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height,'background',0, backgroundLayer);
        this.background.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        const streetHeight = 800;
        //const street = this.game.add.tileSprite(streetPositionX, streetPositionY, streetWidth, streetHeight,'Street',0, buildingsLayer);
        //street.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        let controller = null;
        if (controller === null) {
            controller = new KeyBoardController(this.game);
        }

        /*
        let controller = null;
        if (this.controllerType === 'keyboard') {
            controller = new KeyBoardController(this.game);
        } else if (this.controllerType === 'gamepad') {
            controller = new GamePadController(this.game);
        } else if (this.controllerType === 'virtualpad') {
            controller = new VirtualPadController(this.game);
        } else {
            throw new Error('Unknown controller '+ this.controllerType);
        }*/

        const backbag = new BackBag(this.previousInventory);
        const limits = new StreetLimits(streetPositionX, streetWidth);
        const generator = new CharactersGenerator(
            this.characterLayer,
            limits,
            level,
            backbag,
            controller,
            this.previousGunType,
            this.playerPosition
        );
        this.street = new Street(generator, this.isFinalLevel, this.scoreDisplay);

        const worldBoundX = 0;
        const worldBoundY = 0;
        const worldHeight = 800;
        this.game.world.setBounds(worldBoundX, worldBoundY, worldWidth, worldHeight);

        this.game.camera.follow(this.street.player());

        const measureTime = 130 / 30;

        this.musicians = this.game.add.tileSprite(1200 - 106 * 2, 56, 106, 291, 'scene', 0, backgroundLayer);
        this.musicians.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.musicians.animations.add('play', [0, 1], 16/measureTime, true);
        this.musicians.animations.add('play-hard', [0, 1], 32/measureTime, true);
        this.musicians.animations.play('play');

        // const startingPeople = 300;
        const startingPeople = 100;
        const finalPeople = 300;
        const totalDuration = 37 * measureTime * Phaser.Timer.SECOND;

        const begginingSlow = [0, 9, 17, 24, 34];
        const beginningHard = [5, 15, 20, 30, 38];

        begginingSlow.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                this.musicians.animations.play('play');
            });
        });

        beginningHard.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                this.musicians.animations.play('play-hard');
            });
        });

        const littleCirclePitInfo = {
            //startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 5 * measureTime * Phaser.Timer.SECOND,
            duration: 4 * measureTime * Phaser.Timer.SECOND,
            radiusMax: 150,
            radiusMin: 60,
        };
        const littleWallOfDeath = {
            //startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 13 * measureTime * Phaser.Timer.SECOND,
            waitDuration: 2 * measureTime * Phaser.Timer.SECOND,
            fightDuration: 2 * measureTime * Phaser.Timer.SECOND,
            length: 400,
            height: 200,
        };
        const bigCirclePitInfo = {
            // startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 20 * measureTime * Phaser.Timer.SECOND,
            duration: 4 * measureTime * Phaser.Timer.SECOND,
            radiusMax: 300,
            radiusMin: 100,
        };
        const bigWallOfDeath = {
            // startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 28 * measureTime * Phaser.Timer.SECOND,
            waitDuration: 2 * measureTime * Phaser.Timer.SECOND,
            fightDuration: 4 * measureTime * Phaser.Timer.SECOND,
            length: 600,
            height: 250,
        };

        this.currentMetalMovement = new Nothing();
        this.currentMetalMovement.start(this.draw(), this.drawIn());

        const prepareTime = 3 * Phaser.Timer.SECOND;
        const dontTalkTime = 2 * Phaser.Timer.SECOND;

        // Circle pit 1
        this.game.time.events.add(littleCirclePitInfo.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(littleCirclePitInfo.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('i-want-a-circlepit', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('Circle pit!');
        });
        this.game.time.events.add(littleCirclePitInfo.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new CirclePit(this.game, this.street.citizens(), littleCirclePitInfo.duration, littleCirclePitInfo.radiusMin, littleCirclePitInfo.radiusMax);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(littleCirclePitInfo.duration, () => {
                this.currentMetalMovement = new Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play()
                this.hellyeah(0.5, 4);
            });
        });

        // Wall of death 1
        this.game.time.events.add(littleWallOfDeath.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false
        });
        this.game.time.events.add(littleWallOfDeath.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('the-wall-of-death', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('Wall of death!');
        });
        this.game.time.events.add(littleWallOfDeath.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new WallOfDeath(this.game, this.street.citizens(), littleWallOfDeath.waitDuration, littleWallOfDeath.fightDuration, littleWallOfDeath.length, littleWallOfDeath.height);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(littleWallOfDeath.waitDuration, () => {
                const singerAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
                singerAudio.play();
            });
            this.game.time.events.add(littleWallOfDeath.waitDuration + littleWallOfDeath.fightDuration, () => {
                this.currentMetalMovement = new Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                this.hellyeah(0.6, 4);
            });
        });

        // Circle pit 2
        this.game.time.events.add(bigCirclePitInfo.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(bigCirclePitInfo.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('i-want-a-circlepit', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('CIRCLE PIT!');
        });
        this.game.time.events.add(bigCirclePitInfo.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new CirclePit(this.game, this.street.citizens(), bigCirclePitInfo.duration, bigCirclePitInfo.radiusMin, bigCirclePitInfo.radiusMax);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(bigCirclePitInfo.duration, () => {
                this.currentMetalMovement = new Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                const singerAudio2 = this.game.add.audio('gueulage', 1, false);
                singerAudio2.play();
                this.hellyeah(0.7, 4);
            });
        });

        // Wall of death 2
        this.game.time.events.add(bigWallOfDeath.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(bigWallOfDeath.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('the-wall-of-death', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('WALL OF DEATH!');
        });
        this.game.time.events.add(bigWallOfDeath.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new WallOfDeath(this.game, this.street.citizens(), bigWallOfDeath.waitDuration, bigWallOfDeath.fightDuration, bigWallOfDeath.length, bigWallOfDeath.height);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(bigWallOfDeath.waitDuration, () => {
                const singerAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
                singerAudio.play();
            });
            this.game.time.events.add(bigWallOfDeath.waitDuration + bigWallOfDeath.fightDuration, () => {
                this.currentMetalMovement = new Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                const singerAudio2 = this.game.add.audio('gueulage', 1, false);
                singerAudio2.play();
                this.hellyeah(0.8, 4);
            });
        });

        this.game.time.events.add(38.5 * measureTime * Phaser.Timer.SECOND, () => {
            const singerAudio2 = this.game.add.audio('gueulage2', 1, false);
            singerAudio2.play();
            this.hellyeah(1.0, 8);
        });

        this.game.time.events.add(40 * measureTime * Phaser.Timer.SECOND, () => {
            this.currentMetalMovement = new Exit(this.street.citizens(), this.street.player());
            this.currentMetalMovement.start(this.draw(), this.drawIn());
        });

        this.game.time.events.add(39.5 * measureTime * Phaser.Timer.SECOND, () => {
            this.musicians.animations.stop();
            this.lamps.forEach(lamp => lamp.destroy());
        });

        this.street.addPeople(startingPeople);

        for (let i = 0; i < (finalPeople - startingPeople); i++) {
            this.game.time.events.add(totalDuration * Math.random(), () => {
                this.street.addPeople(1, true);
            });
        }

        this.game.time.events.loop(0.25 * Phaser.Timer.SECOND, () => {
            if (this.graphics) {
                if (this.graphics.alpha > 0) {
                    this.graphics.alpha = 0;
                } else {
                    this.graphics.alpha = 0.2;
                }
            }
            if (this.graphicsIn) {
                if (this.graphicsIn.alpha > 0) {
                    this.graphicsIn.alpha = 0;
                } else {
                    this.graphicsIn.alpha = 0.35;
                }
            }
        });

        const music = this.game.add.audio('music');
        music.play();

        this.game.time.events.loop(measureTime / 32 * Phaser.Timer.SECOND, () => {
            if (!this.scoreDisplay.isInFuryMode()) {
                if (this.isInFuryMode()) {
                    this.scoreDisplay.setFuryMode(true);
                    this.camera.shake(0.006, 100);
                    this.camera.flash(0xffffff, 100, true, 0.3);
                }
            } else {
                this.scoreDisplay.setFuryMode(false);
            }
        });

        this.lamps = [];
        for (let i = 1; i <= 6; i++) {
            const lamp = this.game.add.sprite(1200 - 102 * 2, 56, 'lamp' + i);
            lamp.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
            lamp.alpha = 0;
            this.game.time.events.loop(measureTime / 32 * Phaser.Timer.SECOND, () => {
                lamp.alpha = Math.random() > 0.7 ? 0.5 : 0;
            });
            this.lamps.push(lamp);
        }

        const textPos = new PIXI.Point(950, 262);
        this.singerTextShadow = this.game.add.text(textPos.x + 2, textPos.y + 2, '', TEXT_STYLE_MIDDLE);
        this.singerTextShadow.fill = '#000';
        this.singerText = this.game.add.text(textPos.x, textPos.y, '', TEXT_STYLE_MIDDLE);

        this.currentMetalMovement = new Nothing();
        this.currentMetalMovement.start(this.draw(), this.drawIn());

        this.scoreDisplay.display();
    }

    private draw() {
        this.graphics && this.graphics.destroy();
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.alpha = 0;
        return this.graphics;
    }

    private drawIn() {
        this.graphicsIn && this.graphicsIn.destroy();
        this.graphicsIn = this.game.add.graphics(0, 0);
        this.graphicsIn.alpha = 0;

        return this.graphicsIn;
    }

    private displayEndScreen() {
        console.log('Finished!');
        const player = this.street.player();
        const score = Math.ceil(player.points * POINTS_MULTIPLIER);
        this.game.state.start('Score', true, false, 'keyboard', score);
    }

    public update()
    {
        let player = this.street.player();

        if (player.finished) {
            const keys = Object.keys(SINGER_TEXTS);
            const lastKey = keys[keys.length - 1];
            if (this.singerCanSpeak) {
                this.singerSay(lastKey);
                this.singerCanSpeak = false;
            }
        }

        // this.energyForeground.clear();
        // this.energyForeground.beginFill(player.energy > 50  ? 0x2dcd41 : player.energy  > 20 ? 0xffc80a : 0xf04b36 );
        // this.energyForeground.drawRect(0, 0, 240 * (player.energy / 100), 54);

        if (this.currentMetalMovement) {
            if (this.currentMetalMovement.isIn(this.street.player().position)) {
                this.graphics.visible = false;
                this.graphicsIn.visible = true;
                if (this.currentMetalMovement.constructor.name === 'Exit') {
                    this.displayEndScreen();
                    return;
                }
                if (this.beginningIsIn === null) {
                    this.beginningIsIn = window.performance.now();
                }
                this.increasePoints();
                this.scoreDisplay.setIsIn(true);
            } else {
                this.graphics.visible = true;
                this.graphicsIn.visible = false;
                this.beginningIsIn = null;
                this.scoreDisplay.setIsIn(false);
            }
        }

        if (this.switchPalier()) {
            this.bigTextPositionner.push('bonus x' + this.switchPalier());
        }
        this.previousDiffPoints = this.getPointsDiff();


        if (this.isInFuryMode()) {
            if (this.singerText.text === '') {
                if (this.singerCanSpeak) {
                    this.singerSay(this.getRandomSinger());
                }
            }
        }

        this.game.physics.arcade.collide(this.street.player(), this.street.citizens().all());

        this.game.physics.arcade.collide(this.street.citizens().all(), this.street.citizens().all());

        this.game.physics.arcade.collide(this.topBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.citizens().all());

        this.game.physics.arcade.collide(this.leftBoundMargin, player);
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.citizens().all());

        this.game.physics.arcade.collide(this.rightBoundMargin, player);
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.citizens().all());

        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);

        this.bigTextPositionner.update();

        this.scoreDisplay.update(player.points * POINTS_MULTIPLIER, player.energy, this.getPalier());
    }

    public render()
    {
        if (Config.debug()) {
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );

            this.game.debug.body(this.street.player());
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteInfo(this.street.player(), 32, 200);
            this.street.citizens().all().forEach((citizen) => {
                this.game.debug.body(citizen);
            });
        }
    }

    public shutdown()
    {
        this.sky.destroy();
        this.background.destroy();
        this.street.player().destroy();
        this.street.citizens().all().map(function(citizen: Citizen) { citizen.destroy()});
        this.street = null;
    }

    public nextLevel()
    {
        if (this.switchingLevel === false) {
            this.switchingLevel = true;
            const levelsData = JSON.parse(this.game.cache.getText('levels'));
            const lastLevelNumber = levelsData.length;
            this.levelNumber++;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                if (this.levelNumber <= lastLevelNumber) {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier()
                    );
                } else {
                    this.game.state.start('Menu');
                }
            }, this);
        }
    }

    private buildInventory()
    {
        return {
            'gunAmno': this.street.player().gunAmno(),
            'shotgunAmno': 0,//this.street.player().shotgunAmno(),
            'machinegunAmno': 0,//this.street.player().machinegunAmno(),
            'money': this.street.player().money(),
        };
    }

    private increasePoints() {
        this.street.player().points += this.getPointsDiff();
    }

    private getPointsDiff() {
        if (this.beginningIsIn === null) {
            return 0;
        }
        const now = window.performance.now();
        return (now - this.beginningIsIn) / 1000;
    }

    private isInFuryMode() {
        return this.getPointsDiff() > 5
    }

    private singerSay(text: string) {
        console.log(text);
        this.singerText.setText(text);
        this.singerTextShadow.setText(text);
        const singerAudio = this.game.add.audio(SINGER_TEXTS[text], 1, false);
        singerAudio.play();

        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.singerText.setText('');
            this.singerTextShadow.setText('');
        });


    }

    private hellyeah(percentage: number, duration: number) {
        const citizens = this.street.citizens().all().filter((citizen: Citizen) => {
            return true;
        }).sort((c1, c2) => {
            return - 0.5 + Math.random();
        });
        for (let i = 0; i < citizens.length * percentage; i++) {
            this.game.time.events.add(Math.random() * 0.5 * Phaser.Timer.SECOND, () => {
                citizens[i].hellYeah(duration);
            });
        }
    }

    private switchPalier() {
        const paliers = [5, 8, 11, 14, 17, 20, 23, 26, 29];
        for (let i = 0; i < paliers.length; i++) {
            const limit = paliers[i];
            if (this.previousDiffPoints < limit && this.getPointsDiff() >= limit) {
                return i + 2;
            }
        }

        return null;
    }

    private getPalier() {
        const paliers = [5, 8, 11, 14, 17, 20, 23, 26, 29];
        for (let i = paliers.length - 1; i >= 0; i--) {
            const limit = paliers[i];
            if (this.getPointsDiff() >= limit) {
                return i + 2;
            }
        }

        return 1;
    }

    private getRandomSinger() {
        while (true) {
            const keys = Object.keys(SINGER_TEXTS);
            const randomKey = keys[Math.floor(Math.random() * (keys.length - 1))];
            if (randomKey !== this.lastRandomSinger) {
                this.lastRandomSinger = randomKey;
                return randomKey;
            }
        }
    }
}
