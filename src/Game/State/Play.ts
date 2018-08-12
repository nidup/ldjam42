
import {Street} from "../Street";
import {Citizen} from "../../Character/Bot/Citizen";
import {Cop} from "../../Character/Bot/Cop";
import {BackBag} from "../../Character/Player/BackBag";
import {Config} from "../../Config";
import {LevelLoader} from "../LevelLoader";
import {GamePadController, KeyBoardController, VirtualPadController} from "../Controller";
import {DeviceDetector} from "../DeviceDetector";
import {StreetLimits} from "../StreetLimits";
import {CharactersGenerator} from "../../Character/CharactersGenerator";
import {CirclePit} from "../../Yolo/CirclePit";
import {WallOfDeath} from "../../Yolo/WallOfDeath";

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
    private graphics;

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
        let sideMarginWidth = 100;
        let rightCameraMarginX = this.game.width;
        const detector = new DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            streetPositionX += Config.mobileExtraSidePadding();
            sideMarginWidth = Config.mobileExtraSidePadding();
            rightCameraMarginX -= Config.mobileExtraSidePadding();
        }

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
        if (detector.isMobile()) {
            worldWidth += Config.mobileExtraSidePadding();
        }

        this.rightBoundMargin = this.game.add.tileSprite(rightBoundMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
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
        if (this.controllerType === 'keyboard') {
            controller = new KeyBoardController(this.game);
        } else if (this.controllerType === 'gamepad') {
            controller = new GamePadController(this.game);
        } else if (this.controllerType === 'virtualpad') {
            controller = new VirtualPadController(this.game);
        } else {
            throw new Error('Unknown controller '+ this.controllerType);
        }

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
        this.street = new Street(generator, this.isFinalLevel);
        //this.buildings = [];

        /*
        new LevelInstructions(interfaceLayer, streetPositionX, 0, 'LevelInstructions', level);
        new Inventory(interfaceLayer, streetPositionX + 600, 0, 'Inventory', this.street.player());
        new FlashMessages(interfaceLayer, this.street.player().pastGameEvents(), this.street.player());
        */

        const worldBoundX = 0;
        const worldBoundY = 0;
        const worldHeight = 800;
        this.game.world.setBounds(worldBoundX, worldBoundY, worldWidth, worldHeight);

        this.game.camera.follow(this.street.player());

        const measureTime = 130 / 30;

        const musicians = this.game.add.tileSprite(1200 - 106 * 2, 56, 106, 291, 'scene', 0, backgroundLayer);
        musicians.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        musicians.animations.add('play', [0, 1], 16/measureTime, true);
        musicians.animations.add('play-hard', [0, 1], 32/measureTime, true);
        musicians.animations.play('play');

        const startingPeople = 100;
        const finalPeople = 300;
        const totalDuration = 180 * Phaser.Timer.SECOND;

        const begginingSlow = [0, 9, 17, 24, 34, 40];
        const beginningHard = [5, 15, 20, 30, 38];

        begginingSlow.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                musicians.animations.play('play');
            });
        });

        beginningHard.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                musicians.animations.play('play-hard');
            });
        });

        const littleCirclePitInfo = {
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
            startingTime: 20 * measureTime * Phaser.Timer.SECOND,
            duration: 4 * measureTime * Phaser.Timer.SECOND,
            radiusMax: 300,
            radiusMin: 100,
        };
        const bigWallOfDeath = {
            startingTime: 28 * measureTime * Phaser.Timer.SECOND,
            waitDuration: 2 * measureTime * Phaser.Timer.SECOND,
            fightDuration: 4 * measureTime * Phaser.Timer.SECOND,
            length: 600,
            height: 250,
        };

        this.game.time.events.add(littleCirclePitInfo.startingTime, () => {
            const circlePit = new CirclePit(this.game, this.street.citizens(), littleCirclePitInfo.duration, littleCirclePitInfo.radiusMin, littleCirclePitInfo.radiusMax);
            circlePit.start();
            this.draw().drawCircle(700, 400, 300);
        });

        this.game.time.events.add(littleWallOfDeath.startingTime, () => {
            const wallOfDeath = new WallOfDeath(this.game, this.street.citizens(), littleWallOfDeath.waitDuration, littleWallOfDeath.fightDuration, littleWallOfDeath.length, littleWallOfDeath.height);
            wallOfDeath.start();
            this.draw().drawRect(340, 380, 400, 50);
        });

        this.game.time.events.add(bigCirclePitInfo.startingTime, () => {
            const circlePit = new CirclePit(this.game, this.street.citizens(), bigCirclePitInfo.duration, bigCirclePitInfo.radiusMin, bigCirclePitInfo.radiusMax);
            circlePit.start();
            this.draw().drawCircle(700, 400, 300);
        });


        this.game.time.events.add(bigWallOfDeath.startingTime, () => {
            const wallOfDeath = new WallOfDeath(this.game, this.street.citizens(), bigWallOfDeath.waitDuration, bigWallOfDeath.fightDuration, bigWallOfDeath.length, bigWallOfDeath.height);
            wallOfDeath.start();
            this.draw().drawRect(340, 380, 400, 50);
        });

        this.street.addPeople(startingPeople);

        for (let i = 0; i < (finalPeople - -startingPeople); i++) {
            this.game.time.events.add(totalDuration * Math.random(), () => {
                this.street.addPeople(1, true);
            });
        }

        this.draw().drawRect(840, 350, 70, 150);

        const music = this.game.add.audio('music');
        music.loopFull();
    }

    private draw() {
        this.graphics && this.graphics.destroy();
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.lineStyle(5, 0xFF0000, 1);
        return this.graphics;
    }

    public update()
    {
        /*
        if (this.isFinalLevel) {
            if (this.street.alienQueen().isDead()) {
                const levelText = this.game.add.bitmapText(100, 300, 'cowboy','Congratz, you defeat the aliens!', 30);
                levelText.alpha = 1;
                const tweenAlpha = this.game.add.tween(levelText).to( { alpha: 0 }, 0, "Linear", true);
                this.game.time.events.add(
                    Phaser.Timer.SECOND * 10,
                    function(){
                        this.nextLevel();
                    },
                    this
                );
            }
        } else {
            if (this.street.isEmpty()) {
                this.nextLevel();
            }
        }*/

        this.game.physics.arcade.collide(this.street.player(), this.street.citizens().all());

        this.game.physics.arcade.collide(this.street.citizens().all(), this.street.citizens().all());

        //this.street.citizens().all().forEach(citizen => this.game.debug.body(citizen));

//        this.game.physics.arcade.checkCollision.down = false;
//        this.game.physics.arcade.checkCollision.up = false;

        this.game.physics.arcade.collide(this.topBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.swats().all());

        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.swats().all());

        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.swats().all());

        /*
        const skyParallaxSpeed = 0.03;
        this.sky.tilePosition.x -= skyParallaxSpeed;

        const backgroundParallaxSpeed = 0.05;
        if (this.street.player().movingToTheRight()) {
            this.background.tilePosition.x -= backgroundParallaxSpeed;
        } else if (this.street.player().movingToTheLeft()) {
            this.background.tilePosition.x += backgroundParallaxSpeed;
        }*/

        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);

        /*
        if (this.street.player().isDead()) {
            const hospital = this.buildings.hospital();
            if (hospital && this.street.player().money() >= hospital.nurseCost()) {
                this.street.player().nurse(hospital);
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier(),
                        new Phaser.Point(hospital.entranceX(), hospital.entranceY())
                    );
                    this.street.player().pastGameEvents().register(new HeroNursed(this.game.time.now));
                }, this);
            } else {
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier()
                    );
                }, this);
            }
        }*/
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

            //this.game.debug.body(this.alienQueen);
            //this.game.debug.body(this.street.citizens().all()[0]);
            //this.game.debug.spriteInfo(this.street.citizens().all()[0], 32, 300);
            //this.game.debug.bodyInfo(this.street.citizens().all()[0], 32, 300);

            //this.street.citizens().all().forEach(citizen => this.game.debug.body(citizen));
        }
    }

    public shutdown()
    {
        this.sky.destroy();
        this.background.destroy();
        this.street.player().destroy();
        this.street.citizens().all().map(function(citizen: Citizen) { citizen.destroy()});
        this.street.cops().all().map(function(cop: Cop) { cop.destroy()});
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
}
